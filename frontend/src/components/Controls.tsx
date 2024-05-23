import React, { useContext } from 'react'
import { MusicPlayerContext, useMusicPlayer } from './../context/MusicPlayerContext'

const Controls: React.FC = () => {
  const context = useMusicPlayer()

  if (!context) {
    return <div >Context not available</div>
  }

  const { play, pause, next, previous, seek, isPlaying, audioRef, songs } =
    context

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    seek(time)
  }

  return (
    <div className='mt-10 text-white'>
      <button onClick={previous} disabled={songs.length === 0}>
        Previous
      </button>
      <button onClick={isPlaying ? pause : play} disabled={songs.length === 0}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={next} disabled={songs.length === 0}>
        Next
      </button>
      <input
        type="range"
        min="0"
        max={audioRef.current.duration || 0}
        value={audioRef.current.currentTime || 0}
        onChange={handleSeek}
        disabled={songs.length === 0}
      />
    </div>
  )
}
export default Controls
