import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRoutes from './routes/products'
import orderRoutes from './routes/orders'
import analyticsRoutes from './routes/analytics'

dotenv.config()

const app: Express = express()
const PORT = parseInt(process.env.PORT || '5000', 10)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const MONGODB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/tpg'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err))

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/analytics', analyticsRoutes)

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server running', timestamp: new Date() })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`TPG Backend running on http://0.0.0.0:${PORT}`)
})

