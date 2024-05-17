import mongoose from 'mongoose'

type AlbumType = {
  userId: string
  name: string
  imageURL: string
  songs: string[]
}

const albumSchema = new mongoose.Schema<AlbumType>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    songs: { type: [String], required: true}
  },
  { timestamps: true }
)

const Album = mongoose.model<AlbumType>('Album', albumSchema)
export default Album