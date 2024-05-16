import mongoose from 'mongoose'

type AlbumType = {
  userId: string
  name: string
  imageURL: string
}

const albumSchema = new mongoose.Schema<AlbumType>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model<AlbumType>('Album', albumSchema)