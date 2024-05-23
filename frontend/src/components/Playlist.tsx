import { SongType } from '../api-client'
import { FaHeart, FaPlay } from 'react-icons/fa'

type props = {
  songs: SongType[]
}

const Playlist = ({ songs }: props) => {
  return (
    <div className="flex flex-col gap-3 mt-10">
      {songs.map((song) => (
        <div className="flex gap-5 w-[2000px] ml-auto mr-auto mt-3 mb-0">
          <div className="relative">
            <img
              src={song.imageInfo.url}
              width={95}
              height={95}
              alt=""
              className="opacity-50 hover:opacity-80"
            />
            <FaPlay className="absolute text-gray-200 left-[25%] right-[25%] top-[10%] w-[32px] h-[36px] cursor-pointer" />
          </div>

          <div className="flex flex-2 flex-col">
            <h1 className="text-2xl font-bold text-gray-300">{song.name}</h1>
            <small className="text-gray-300">{song.category}</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Playlist
