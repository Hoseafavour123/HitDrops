import { SongType } from '../api-client'
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react'
import {
  BsFillSkipStartCircleFill,
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipEndCircleFill,
} from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { MouseEvent } from 'react'

type props = {
  song: SongType
  songs: SongType[]
  isPlaying: boolean
  duration: number
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  setSongs: Dispatch<SetStateAction<SongType[]>>
  setCurrentSong: Dispatch<SetStateAction<SongType | undefined>>
  audioElem: MutableRefObject<HTMLAudioElement | null>
  progress: number
}

const Player = ({
  song,
  songs,
  isPlaying,
  setIsPlaying,
  setSongs,
  setCurrentSong,
  audioElem,
  progress,
  duration,
}: props) => {
  const clickRef = useRef<HTMLInputElement | null>(null)

  const [cancelPlay, setCancelPlay] = useState<boolean>(false)

 

  const checkWidth = (e: MouseEvent<HTMLInputElement>) => {
    let width = clickRef.current?.clientWidth
    const offSet = e.nativeEvent.offsetX
    if (width && audioElem.current) {
      const progress = (offSet / width) * 100
      audioElem.current.currentTime = (progress / 100) * duration
      if (!isPlaying) {
        setIsPlaying(true)
      }
    }
  }

  const skipBack = () => {
    const index = songs.findIndex((x) => x.name === song.name)
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1])
    } else {
      setCurrentSong(songs[index - 1])
    }
    if (audioElem.current) {
      audioElem.current.currentTime = 0
      if (!isPlaying) {
        setIsPlaying(true)
      }
    }
  }

  
  const skipNext = () => {
    const index = songs.findIndex((x) => x.name === song.name)
    if (index === songs.length - 1) {
      setCurrentSong(songs[0])
    } else {
      setCurrentSong(songs[index + 1])
    }
    if (audioElem.current) {
      audioElem.current.currentTime = 0
      if (!isPlaying) {
        setIsPlaying(true)
      }
    }
  }

  const PlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleCancelPlay = () => {
    setCancelPlay(!cancelPlay)
    setIsPlaying(false)
  }

   
     const formatTime = (seconds: number): string=> {
      const minutes = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${minutes}: ${secs < 10 ? '0' : ''}${secs}`
   }
  

  return (
    <div className="md:container bg-black mt-10 p-3 md:w-full sticky bottom-0 md:left-64 max-lg:right-0 max-lg:left-0">
      {!cancelPlay && (
        <>
          <div className="relative h-full">
            <p className="text-gray-300 flex justify-center m-1">
              {song?.name}
            </p>
            <FaTimes
              className="text-white cursor-pointer hover:text-red-400 h-4 w-4 absolute right-2 top-1"
              onClick={handleCancelPlay}
            />
          </div>

          {audioElem.current?.currentTime && (
            <p className="text-white">
              {formatTime(audioElem.current?.currentTime)}
            </p>
          )}
          <div className="flex justify-center gap-2 max-lg:flex-col max-lg:items-center">
            <div className="flex">
              <img
                src={song.imageInfo.url}
                alt={song.name}
                width={150}
                height={150}
                className=""
              />
            </div>

            <input
              type="range"
              min="0"
              max="100"
              className="w-full cursor-pointer"
              value={progress}
              onClick={checkWidth}
              ref={clickRef}
            />
          </div>

          <div className="flex text-gray-200 justify-center gap-4 mt-2">
            <BsFillSkipStartCircleFill
              className="h-10 w-10 hover:opacity-50 cursor-pointer"
              onClick={skipBack}
            />
            {isPlaying ? (
              <BsFillPauseCircleFill
                className="h-12 w-12 hover:opacity-50 cursor-pointer"
                onClick={PlayPause}
              />
            ) : (
              <BsFillPlayCircleFill
                className="h-12 w-12 hover:opacity-50 cursor-pointer"
                onClick={PlayPause}
              />
            )}
            <BsFillSkipEndCircleFill
              className="h-10 w-10 hover:opacity-50 cursor-pointer"
              onClick={skipNext}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Player
