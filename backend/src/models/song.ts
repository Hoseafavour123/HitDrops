import mongoose from 'mongoose'

export type SongType = {
  userId: string
  name: string
  imageInfo: { url: string; id: string }
  songInfo: { url: string; id: string}
  album: string
  category: string
  language: string
}

const songSchema = new mongoose.Schema<SongType>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    imageInfo: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    songInfo: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    album: { type: String, required: false },
    category: { type: String, required: true },
    language: { type: String, required: true },
  },
  { timestamps: true }
)

const Song = mongoose.model<SongType>('Song', songSchema)
export default Song
