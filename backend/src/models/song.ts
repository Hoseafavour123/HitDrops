import mongoose from 'mongoose'

type SongType = {
  userId: string
  name: string
  imageURL: string
  songURL: string
  album: string
  category: string;
  language: string;
}

const songSchema = new mongoose.Schema<SongType>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    songURL: {type: String, required: true},
    album: {type: String, required: false},
    category: { type: String, required: true},
    language: { type: String, required: true}
  },
  { timestamps: true }
)

module.exports = mongoose.model<SongType>('Song', songSchema)