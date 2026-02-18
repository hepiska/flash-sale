import api from '@/lib/api'
import type { Product } from '@/types'

type ApiListResponse<T> = {
  data: {
    total: number
    items: T[]
    page: number
    limit: number
  }
  page: number
  limit: number
}

type ProductApi = {
  _id: string
  name: string
  imageUrl?: string
  description?: string
  price?: number
  totalStock: number
  remainingStock: number
  saleId?: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const mapProduct = (product: ProductApi): Product => ({
  id: product._id,
  name: product.name,
  description: product.description || '',
  price: product.price ?? 0,
  stock: product.remainingStock,
  imageUrl: product.imageUrl,
  isActive: product.isActive,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
})

export const productService = {
  async getById(id: string): Promise<Product> {
    const { data } = await api.get<{ data: ProductApi }>(`/products/${id}`)
    return mapProduct(data.data)
  },

  async getSaleProducts(saleId: string, page = 1, limit = 10): Promise<Product[]> {
    const { data } = await api.get<ApiListResponse<ProductApi>>(`/products/sale/${saleId}`, {
      params: { page, limit },
    })
    return data.data.items.map(mapProduct)
  },

  async getAll(saleId?: string, page = 1, limit = 10): Promise<Product[]> {
    if (!saleId) {
      return []
    }
    return this.getSaleProducts(saleId, page, limit)
  },
}
