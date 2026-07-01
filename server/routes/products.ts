import { Router, Request, Response } from 'express'
import Product from '../models/Product'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router

