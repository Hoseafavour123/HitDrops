import { SongType } from "../api-client"
import {FaHeart, FaDownload} from 'react-icons/fa'


type props = {
    song: SongType
}
const Actions = ({song}: props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-2 mr-4">
        <img src={song.imageInfo.url} width={300} height={300} alt="" />
      </div>
      <div className="flex-1">
        <h1 className="text-4xl text-gray-300">{song.name}</h1>
        <small className="text-gray-200">{song.category}</small>
      </div>

      <div className="flex-1">
        <div className="flex gap-3 text-white">
          <FaHeart className="bg-red-500 h-7 w-7" />
          <FaDownload className="bg-blue-400 h-7 w-7" />
        </div>
      </div>
    </div>
  )
}

export default Actions