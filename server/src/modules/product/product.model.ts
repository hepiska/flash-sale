import mongoose, { Schema, model, Document } from 'mongoose'

export interface ProductDocument extends Document {
  name: string
  slug?: string
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
  slug: {
    type: String,
    unique: true,
    sparse: true,
    index: true,
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

const toSlug = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

ProductSchema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = toSlug(this.name)
  }
  next()
})


ProductSchema.index({ slug: 1, isActive: 1 })
ProductSchema.index({ saleId: 1, isActive: 1 })


export const ProductModel = model<ProductDocument>('products', ProductSchema)
