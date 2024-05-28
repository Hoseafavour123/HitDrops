import { useQuery } from 'react-query'
import Player from '../components/Player'
import { SongType } from '../api-client'
import * as apiClient from '../api-client'
import Loader from '../components/Loader'
import { useEffect, useRef, useState } from 'react'
import { BsFillPlayCircleFill, BsFillStopCircleFill } from 'react-icons/bs'

const MySongs = () => {
  const [mySongs, setMySongs] = useState<SongType[]>([])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentSong, setCurrentSong] = useState<SongType>()
  const audioElem = useRef<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  // const [currentTime, setCurrentTime] = useState<number>()

  const { data: songs } = useQuery('getMySongs', apiClient.getMySongs, {
    onSuccess: (songs) => {
        if (songs) {
          setMySongs(songs)
          setCurrentSong(songs[0])
        }
    },
  })

    useEffect(() => {
      if (isPlaying) {
        audioElem.current?.play()
      } else {
        audioElem.current?.pause()
      }
    }, [isPlaying, currentSong, songs])
  

  const onPlaying = () => {
    const duration = audioElem.current?.duration
    const currentTime = audioElem.current?.currentTime
    if (currentTime && duration) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setDuration(duration)
    }
  }

  const handlePlayBtn = (index: number) => {
    {songs && setCurrentSong(songs[index])}
    if (!isPlaying) {
      setIsPlaying(true)
    }
   
  }

  const handlePauseBtn = (index: number ) => {
   setIsPlaying(!isPlaying)
  }

  if (!songs) {
    return <Loader />
  }
  return (
    <div className="mt-10">
      <div className="container mx-auto flex flex-col">
        <h1 className="text-3xl text-gray-300 "> My Songs </h1>
        {songs.map((song, index) => (
          <div className={`${currentSong === songs[index] ? "bg-gray-900": ''} flex gap-2 m-3 p-3 relative`}>
            <img src={song.imageInfo.url} height={100} width={100} alt="" />
            <div className="flex flex-col">
              <h1 className="text-xl text-gray-200">{song.name}</h1>
              <small className="text-sm text-gray-300">{song.category}</small>
            </div>
            {currentSong === songs[index] && (
              <div className="text-white">
                <BsFillStopCircleFill
                  className="text-black w-10 h-10 absolute left-0 hover:opacity-40 cursor-pointer"
                  onClick={() => handlePauseBtn(index)}
                />
              </div>
            )}
            {currentSong !== songs[index] && (
              <div>
                <BsFillPlayCircleFill
                  className="text-black w-10 h-10 absolute left-0 hover:opacity-40 cursor-pointer"
                  onClick={() => handlePlayBtn(index)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {songs.length > 0 && (
        <audio
          src={currentSong?.songInfo.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        ></audio>
      )}
      {songs && currentSong && (
        <Player
          song={currentSong}
          songs={mySongs}
          setSongs={setMySongs}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioElem={audioElem}
          progress={progress}
          duration={duration}
          setCurrentSong={setCurrentSong}
        />
      )}
    </div>
  )
}
export default MySongs
