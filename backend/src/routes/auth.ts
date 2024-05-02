import express, { Request, Response } from 'express'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { check, validationResult } from 'express-validator'

const router = express.Router()


router.post(
  '/login',
  [
    check('email', 'Email required').isEmail(),
    check('password', 'Password is required, must be > 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() })
    }
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }
      const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY as string,
        { expiresIn: '1d' }
      )
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      })
      return res.status(200).json({ userId: user._id })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
)


router.get('/displayName/:displayName', async(req: Request, res: Response) => {
    try {
        let existingName = await User.findOne({ displayName: req.params.displayName })
        res.json({ exists: !!existingName})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong'})
        
    }
})
export default router