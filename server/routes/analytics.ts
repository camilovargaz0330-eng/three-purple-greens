import { Router, Request, Response } from 'express'
import AnalyticsEvent from '../models/AnalyticsEvent'

const router = Router()

router.post('/track', async (req: Request, res: Response) => {
  try {
    const event = new AnalyticsEvent(req.body)
    await event.save()
    res.status(201).json({ success: true })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/dashboard/sales', async (req: Request, res: Response) => {
  try {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const confirmedOrders = await require('../models/Order').default.find({
      status: 'confirmed',
      createdAt: { $gte: weekAgo }
    })
    
    const gmv = confirmedOrders.reduce((sum: number, order: any) => sum + order.total, 0)
    const aov = confirmedOrders.length > 0 ? gmv / confirmedOrders.length : 0
    
    res.json({
      gmv_semanal: gmv,
      aov: Number(aov.toFixed(2)),
      conversion_rate: '0%',
      abandono_carrito: '0%',
      ltv_6meses: 0,
      cac: 0,
      rotacion_inventario: 0
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

