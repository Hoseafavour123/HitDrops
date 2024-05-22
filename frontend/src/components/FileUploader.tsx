import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { BiCloudUpload } from 'react-icons/bi'
import { SongType } from './UploadForm'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../config/firebase.config.js'

type props = {
  updateState: Dispatch<SetStateAction<string>>
  setProgress: Dispatch<SetStateAction<number>>
  isLoading: Dispatch<SetStateAction<boolean>>
  isImage: boolean
  isDeleting: boolean
  setIsDeleting: Dispatch<SetStateAction<boolean>>
  register: UseFormRegister<SongType>
  watch: UseFormWatch<SongType>
}
const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
  isDeleting,
  setIsDeleting,
  register,
  watch,
}: props) => {

  const watchFile = watch(`${isImage ? 'image' : 'audio'}`)

  useEffect(() => {
    if (watchFile && watchFile.length > 0 && !isDeleting) {
      isLoading(true)
      const storageRef = ref(
        storage,
        `${isImage ? 'Images' : 'Audio'}/${Date.now()}-${watchFile[0].name}`
      )
      const uploadTask = uploadBytesResumable(storageRef, watchFile[0])
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateState(downloadURL);
            console.log(downloadURL)
            isLoading(false)
          })
        }
      )
    }
    setIsDeleting(false)
  }, [watchFile, isDeleting, storage])

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl mt-10">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to upload {isImage ? 'song cover' : 'an audio'}
          </p>
        </div>
      </div>
      <input
        type="file"
        accept={`${isImage ? 'image/*' : 'audio/*'}`}
        className={'w-0 h-0'}
        {...register(`${isImage ? 'image' : 'audio'}`, { required: 'This field is required'})}
      />
    </label>
  )
}

export default FileUploader
