import mongoose, { Schema, Document } from 'mongoose'

export interface IOrder extends Document {
  cartItems: any[]
  customerEmail: string
  customerPhone?: string
  status: 'pending_confirmation' | 'confirmed' | 'shipped' | 'cancelled'
  subtotal: number
  shippingCost?: number
  total: number
  shippingAddress?: any
  paymentMethod?: string
  paymentProof?: string
  createdAt: Date
  confirmedAt?: Date
  completedAt?: Date
  notes?: string
}

const OrderSchema = new Schema<IOrder>({
  cartItems: [Schema.Types.Mixed],
  customerEmail: { type: String, required: true },
  customerPhone: String,
  status: { type: String, enum: ['pending_confirmation', 'confirmed', 'shipped', 'cancelled'], default: 'pending_confirmation' },
  subtotal: { type: Number, required: true },
  shippingCost: Number,
  total: { type: Number, required: true },
  shippingAddress: Schema.Types.Mixed,
  paymentMethod: String,
  paymentProof: String,
  createdAt: { type: Date, default: Date.now },
  confirmedAt: Date,
  completedAt: Date,
  notes: String
})

export default mongoose.model<IOrder>('Order', OrderSchema)

