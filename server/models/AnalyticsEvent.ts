import mongoose, { Schema, Document } from 'mongoose'

export interface IAnalyticsEvent extends Document {
  type: string
  productId?: string
  orderId?: string
  value?: number
  source: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  timestamp: Date
  sessionId: string
  deviceType: string
  geoCountry?: string
}

const AnalyticsEventSchema = new Schema<IAnalyticsEvent>({
  type: { type: String, required: true },
  productId: String,
  orderId: String,
  value: Number,
  source: { type: String, required: true },
  utm_source: String,
  utm_medium: String,
  utm_campaign: String,
  timestamp: { type: Date, default: Date.now },
  sessionId: { type: String, required: true },
  deviceType: String,
  geoCountry: String
})

export default mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema)

