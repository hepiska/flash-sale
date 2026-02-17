import api from '@/lib/api'
import type { FlashSale } from '@/types'

export const flashSaleService = {
  async getAll(): Promise<FlashSale[]> {
    const { data } = await api.get<FlashSale[]>('/flash-sales')
    return data
  },

  async getActive(): Promise<FlashSale[]> {
    const { data } = await api.get<FlashSale[]>('/flash-sales/active')
    return data
  },

  async getById(id: string): Promise<FlashSale> {
    const { data } = await api.get<FlashSale>(`/flash-sales/${id}`)
    return data
  },

  async create(flashSale: Partial<FlashSale>): Promise<FlashSale> {
    const { data } = await api.post<FlashSale>('/flash-sales', flashSale)
    return data
  },

  async update(id: string, flashSale: Partial<FlashSale>): Promise<FlashSale> {
    const { data } = await api.patch<FlashSale>(`/flash-sales/${id}`, flashSale)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/flash-sales/${id}`)
  },
}
