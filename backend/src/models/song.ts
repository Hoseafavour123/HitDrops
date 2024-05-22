import mongoose from 'mongoose'

export type SongType = {
  userId: string
  name: string
  imageInfo: { url: string; id: string }
  songInfo: { url: string; id: string}
  album: string
  category: string
  language: string
  availability: string
  downloadable: boolean
  lyrics: string
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
    availability: { type: String, enum: ['public', 'private'], required: true },
    downloadable: { type: Boolean, required: true },
    lyrics: { type: String, required: false },
  },
  { timestamps: true }
)

const Song = mongoose.model<SongType>('Song', songSchema)
export default Song
