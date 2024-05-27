import { useQuery } from 'react-query'
import Player from '../components/Player'
import { SongType } from '../api-client'
import * as apiClient from '../api-client'
import Loader from '../components/Loader'
import { useEffect, useRef, useState } from 'react'

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

  if (!songs) {
    return <Loader />
  }
  return (
    <div>
      <img src={songs[2].songInfo.url} height={100} width={100} alt="" />
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
