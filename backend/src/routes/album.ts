import express, { Request, Response } from 'express'
import Album from './../models/album'
import verifyToken from '../middleware/auth'
const router = express.Router()


router.get('/', async (req: Request, res: Response) => {
  try {
    const albums = await Album.find({})
    return res.status(200).json(albums)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ messsage: 'Error fetching Albums'})
  }
  
})

router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const newAlbum = new Album(req.body)
    newAlbum.userId = req.userId
  } catch (error) {
    
  }
  return res.status(200).json({ message: 'Album created' })
})

export default router
