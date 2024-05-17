import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import * as apiClient from './../api-client'
import { useMutation } from 'react-query'
import { useAppContext } from '../context/AppContext'
import FileLoader from './FileLoader'
import FileUploader from './FileUploader'
import Loader from './Loader'

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

export type SongType = {
  name: string
  image: FileList
  audio: FileList
  category: string
  language: string
}

const UploadForm = () => {
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false)
  const [imageUploadProgress, setImageUploadProgress] = useState<number>(0)
  const [songImageCover, setSongImageCover] = useState<string>('')
  const [isAudioUploading, setIsAudioUploading] = useState<boolean>(false)

  const { showToast } = useAppContext()

  const { register, handleSubmit, reset, watch } = useForm<SongType>()

  const mutation = useMutation(apiClient.UploadSong, {
    onSuccess: (data) => {
      console.log(data)
      showToast({ message: 'Upload successfull', type: 'SUCCESS' })
      reset()
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const onSubmit: SubmitHandler<SongType> = (data) => {
    console.log(data);
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('language', data.language)
    formData.append('category', data.category)
    formData.append('image', data.image[0])
    formData.append('audio', data.audio[0])
    console.log(formData)
    //mutation.mutate(formData)
  }

  if (mutation.isLoading) {
    return <Loader />
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

      <div className="bg-gray-500 backdrop-blur-md w-full h-[200px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer mt-5">
        {isImageUploading && <FileLoader progress={20} />}
        {!isImageUploading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageUploading}
                isImage={true}
                register={register}
                watch={watch}
              />
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>
      <div className="bg-gray-500 backdrop-blur-md w-full h-[200px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer mt-5">
        {isImageUploading && <FileLoader progress={20} />}
        {!isImageUploading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageUploading}
                isImage={false}
                register={register}
                watch={watch}
              />
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>
      <button type="submit">submit</button>
    </form>
  )

  {
    /*<div className="container mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Language:</label>
          <select
            {...register('language', { required: true })}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <select
            {...register('category', { required: true })}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: true })}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Audio:</label>
          <input
            type="file"
            accept="audio/*"
            {...register('audio', { required: true })}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          {mutation.isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
          </div>
          */
  }
}
export default UploadForm
