import express, { Request, Response } from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoutes from './routes/user'
import authRoutes from './routes/auth'
import albumRoutes from './routes/album'
import songRoutes from './routes/song'
import cookieParser from 'cookie-parser'

mongoose.connect(process.env.MONGO_URI as string)

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.use('/api/albums', albumRoutes)
app.use('/api/song', songRoutes)
app.listen(7000, () => {
    console.log('App listening on port 7000');
})