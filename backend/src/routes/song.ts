import express, { Request, Response } from 'express'
import Song, { SongType } from '../models/song'
import cloudinary, { UploadApiResponse } from 'cloudinary'
import multer from 'multer'
import verifyToken from './../middleware/auth'
import { body, validationResult } from 'express-validator'
const router = express.Router()

type UploadResponse = {
  url?: string;
  id?: string;
}

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/', async (req: Request, res: Response) => {
  try {
    const song = await Song.find({})
    return res.status(200).json(song)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ messsage: 'Error fetching songs' })
  }
})

router.post(
  '/upload',
  verifyToken,
  [
    body('name').notEmpty().withMessage('name is required'),
    body('language').notEmpty().withMessage('language is required'),
    body('category').notEmpty().withMessage('category is required'),
  ],
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    if (!req.files) {
      return res.status(400).json({ message: 'No files uploaded'})
    }
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const imageFile = files['image'][0]
    const audioFile = files['audio'][0]
    const { name, language, category } = req.body

     try {
      //upload image
       const imageResult:  UploadResponse = await new Promise((resolve, reject) => {
         const stream = cloudinary.v2.uploader.upload_stream(
           { resource_type: 'image' },
           (error, result) => {
             if (error) reject(error)
             resolve({
            url: result?.secure_url,
            id: result?.public_id
            })
           }
         )
         stream.end(imageFile.buffer)
       })
       //upload audio
       const audioResult: UploadResponse = await new Promise((resolve, reject) => {
         const stream = cloudinary.v2.uploader.upload_stream(
           { resource_type: 'video' },
           (error, result) => {
             if (error) reject(error)
             resolve({
            url: result?.secure_url,
            id: result?.public_id
            })
           }
         )
         stream.end(audioFile.buffer)
       })
       const newSong = new Song({
        name,
        language,
        category,
        imageInfo: imageResult,
        songInfo: audioResult
       })
       newSong.userId = req.userId
       const savedSong = await newSong.save()

       return res.status(200).json(savedSong)
     } catch (error) {
       console.log(error)
       res.status(500).json({ message: 'Error uploading files' })
     }

    
  }
)

export default router
