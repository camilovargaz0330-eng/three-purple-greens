import { Router, Request, Response } from 'express'
import Order from '../models/Order'

const router = Router()

router.post('/create-draft', async (req: Request, res: Response) => {
  try {
    const { cartItems, customerEmail, customerPhone } = req.body
    const total = cartItems.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0)
    
    const order = new Order({
      cartItems,
      customerEmail,
      customerPhone,
      status: 'pending_confirmation',
      subtotal: total,
      total: total
    })
    
    await order.save()
    res.status(201).json({ orderId: order._id, status: 'pending_confirmation' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const { status } = req.query
    const query = status ? { status } : {}
    const orders = await Order.find(query)
    res.json(orders)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id/confirm', async (req: Request, res: Response) => {
  try {
    const { paymentMethod, paymentProof, notes } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: 'confirmed',
        paymentMethod,
        paymentProof,
        notes,
        confirmedAt: new Date()
      },
      { new: true }
    )
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

