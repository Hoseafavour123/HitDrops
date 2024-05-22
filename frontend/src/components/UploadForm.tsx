import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Textarea } from 'flowbite-react'
import { useState } from 'react'
import * as apiClient from './../api-client'
import { useMutation } from 'react-query'
import { useAppContext } from '../context/AppContext'
import FileLoader from './FileLoader'
import FileUploader from './FileUploader'
import Loader from './Loader'
import { FaTimes } from 'react-icons/fa'
import { Dispatch, SetStateAction } from 'react'
import { storage } from '../config/firebase.config'
import { deleteObject, ref } from 'firebase/storage'

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Other',
]
const categories = [
  'Gospel',
  'R&B',
  'Reggae',
  'Pop',
  'Rock',
  'Jazz',
  'Classical',
  'Hip-hop',
  'Country',
  'Alternative',
]
const downloadsOption =['yes', 'no']
const availability = ['public', 'private']

export type SongType = {
  name: string
  image: FileList
  audio: FileList
  category: string
  language: string
  availability: string
  downloadable: string
  lyrics: string
}

type props = {
  url: string
  isImage: boolean
  setIsImageLoading: Dispatch<SetStateAction<boolean>>
  setSongImageCover: Dispatch<SetStateAction<string>>
  setIsAudioUploading: Dispatch<SetStateAction<boolean>>
  setAudioCoverImage: Dispatch<SetStateAction<string>>
  setCancelFile: Dispatch<SetStateAction<boolean>>
}

const UploadForm = () => {
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false)
  const [imageUploadProgress, setImageUploadProgress] = useState<number>(0)
  const [songImageCover, setSongImageCover] = useState<string>('')

  const [audioImageCover, setAudioImageCover] = useState<string>('')
  const [audioUploadingProgress, setAudioUploadingProgress] =
    useState<number>(0)
  const [isAudioUploading, setIsAudioUploading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const { showToast } = useAppContext()

  const { register, handleSubmit, reset, watch, setValue } = useForm<SongType>()

  const mutation = useMutation(apiClient.UploadSong, {
    onSuccess: (data) => {
      console.log(data)
      showToast({ message: 'Upload successfull', type: 'SUCCESS' })
      deleteFileObject(
        songImageCover,
        true,
        setIsImageUploading,
        setSongImageCover
      )
      deleteFileObject(
        audioImageCover,
        false,
        setIsAudioUploading,
        setAudioImageCover
      )
      reset()
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const onSubmit: SubmitHandler<SongType> = (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('language', data.language)
    formData.append('category', data.category)
    formData.append('availability', data.availability)
    formData.append('downloadable', data.downloadable)
    formData.append('lyrics', data.lyrics)
    formData.append('image', data.image[0])
    formData.append('audio', data.audio[0])
    console.log(formData)
    mutation.mutate(formData)
  }

  if (mutation.isLoading) {
    return <Loader />
  }

  const deleteFileObject = (
    url: props['url'],
    isImage: props['isImage'],
    setIsImageLoading: props['setIsImageLoading'],
    setSongImageCover: props['setSongImageCover']
  ) => {
    if (isImage) {
      setIsImageLoading(true)
      setIsAudioUploading(true)
    }
    const deleteRef = ref(storage, url)
    deleteObject(deleteRef).then(() => {
      setSongImageCover('')
      setAudioImageCover('')
      setIsImageLoading(false)
      setIsAudioUploading(false)
      setIsDeleting(true)
      setValue(`${isImage ? "image" : "audio"}`, null as any)
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 max-w-[40%] justify-center container mx-auto"
    >
      <h1 className="font-bold text-center text-white text-xl mb-3">
        Upload a Song
      </h1>
      <div className="flex max-lg:flex-col justify-between gap-3 bg-black rounded-md px-5 py-5">
        <div className="mb-4">
          <label className="block text-gray-400">Name of song:</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="mt-2 p-2 border border-gray-300 bg-gray-200 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Language:</label>
          <select
            {...register('language', { required: true })}
            className="mt-2 p-2 border border-gray-300 bg-gray-200 rounded-lg w-full"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Category:</label>
          <select
            {...register('category', { required: true })}
            className="mt-2 p-2 border border-gray-300 bg-gray-200 rounded-lg w-full"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 flex max-lg:flex-col justify-around gap-3 bg-black rounded-md px-5 py-5">
        <div className="mb-4">
          <label className="block text-gray-400">Allow downloads:</label>
          <select
            {...register('downloadable', { required: true })}
            className="mt-2 p-2 border border-gray-300 bg-gray-200 rounded-lg w-full"
          >
            {downloadsOption.map((option) => (
              <option
                key={option}
                value={`${option === 'yes' ? 'true' : 'false'}`}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Availability:</label>
          <select
            {...register('availability', { required: true })}
            className="mt-2 p-2 border border-gray-300 bg-gray-200 rounded-lg w-full"
          >
            {availability.map((avail) => (
              <option key={avail} value={avail}>
                {avail}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-500 backdrop-blur-md w-full min-h-[200px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer mt-5">
        {isImageUploading && <FileLoader progress={imageUploadProgress} />}
        {!isImageUploading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageUploading}
                isImage={true}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
                register={register}
                watch={watch}
              />
            ) : (
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <img
                  src={songImageCover}
                  alt="song cover image"
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out z-10"
                  onClick={() => {
                    deleteFileObject(
                      songImageCover,
                      true,
                      setIsImageUploading,
                      setSongImageCover
                    )
                  }}
                >
                  <FaTimes className="white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-gray-500 backdrop-blur-md w-full min-h-[200px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer mt-5">
        {isAudioUploading && <FileLoader progress={audioUploadingProgress} />}
        {!isAudioUploading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadingProgress}
                isLoading={setIsAudioUploading}
                isImage={false}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
                register={register}
                watch={watch}
              />
            ) : (
              <div className="h-full w-full rounded-md overflow-hidden flex items-center justify-center">
                <audio controls className="h-15 mt-10">
                  <source src={audioImageCover} type="audio/mpeg" />
                </audio>
                <button
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => {
                    deleteFileObject(
                      audioImageCover,
                      false,
                      setIsAudioUploading,
                      setAudioImageCover
                    )
                  }}
                >
                  <FaTimes className="white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="min-h-[300px] mt-3">
        <h2 className="text-center text-gray-300 font-bold mt-3">
          Lyrics (optional):{' '}
        </h2>
        <Textarea
          id="lyrics"
          style={{ resize: 'none' }}
          rows={10}
          placeholder="Lyrics..."
          className="bg-white"
          {...register('lyrics')}
        />
      </div>

      <Button
        pill
        disabled={mutation.isLoading}
        type="submit"
        className="mt-2 text-white font-bold hover:bg-purple-700 disabled:bg-gray-500"
      >
        {mutation.isLoading ? 'Uploading...' : 'Upload'}
      </Button>
    </form>
  )
}
export default UploadForm
