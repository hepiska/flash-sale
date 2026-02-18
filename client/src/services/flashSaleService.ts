import api from '@/lib/api'
import type { FlashSale } from '@/types'

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

type FlashSaleApi = {
  _id: string
  title: string
  imageUrl?: string
  description?: string
  startTime: string
  endTime: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

type FlashSaleResponse = {
  data: FlashSaleApi
}


export const flashSaleService = {
  async getAll(page = 1, limit = 10): Promise<FlashSaleApi[]> {
    const { data } = await api.get<ApiListResponse<FlashSaleApi>>('/flash-sales', {
      params: { page, limit },
    })
    return data.data.items
  },

  async getById(id: string): Promise<FlashSaleApi> {
    const { data } = await api.get<FlashSaleResponse>(`/flash-sales/${id}`)
    return data.data
  },
}
