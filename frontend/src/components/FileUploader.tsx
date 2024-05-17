import { Dispatch, SetStateAction, useEffect } from "react"
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { BiCloudUpload } from 'react-icons/bi'
import { SongType } from "./UploadForm";
type props = {
    updateState: Dispatch<SetStateAction<string>>;
    setProgress: Dispatch<SetStateAction<number>>;
    isLoading: Dispatch<SetStateAction<boolean>>;
    isImage: boolean
    register: UseFormRegister<SongType>
    watch: UseFormWatch<SongType>
}
const FileUploader = ({updateState, setProgress, isLoading, isImage, register, watch}: props) => {
   

  const watchFile = watch(`${isImage ? 'image': 'audio'}`)
  useEffect(() => {
    if (watchFile) {
           isLoading(true)
           
    }
  })
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
            <p className="font-bold text-2xl">
                <BiCloudUpload/>
            </p>
            <p className="text-lg">Click to upload {isImage ? "song cover": "an audio"}</p>
        </div>
      </div>
      <input type="file" accept={`${isImage ? "image/*": "audio/*"}`} className={"w-0 h-0"} {...register(`${isImage ? 'image': 'audio'}`)}/>
    </label>
  )
}

export default FileUploader
