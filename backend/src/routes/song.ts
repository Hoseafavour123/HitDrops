import express, { Request, Response } from 'express'
const router = express.Router()

router.post('/create', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Song created' })
})

export default router
