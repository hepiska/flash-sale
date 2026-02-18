import mongoose, { Schema, model, Document } from 'mongoose'

export interface ProductDocument extends Document {
  name: string
  description?: string
  imageUrl?: string
  totalStock: number
  remainingStock: number
  isActive: boolean
  price: number
  stock: number
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String
  },
  description: {
    type: String
  },
  // The original stock count
  totalStock: {
    type: Number,
    required: true,
    min: 0
  },
  // The "Live" stock count used for decrements
  remainingStock: {
    type: Number,
    required: true,
    min: 0
  },
  saleId: {
    type: Schema.Types.ObjectId,
    ref: 'flashsales',
    default: null
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  // To manually kill a sale if something goes wrong
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export const ProductModel = model<ProductDocument>('products', ProductSchema)
