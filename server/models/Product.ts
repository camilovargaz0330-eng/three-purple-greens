import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  category: string
  categoryLabel?: string
  price: number
  stock: number
  imageUrl: string
  terpenes?: string[]
  effects?: string[]
  thc?: number
  cbd?: number
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  categoryLabel: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  terpenes: [String],
  effects: [String],
  thc: Number,
  cbd: Number
})

export default mongoose.model<IProduct>('Product', ProductSchema)