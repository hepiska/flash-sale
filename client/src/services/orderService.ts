import api from '@/lib/api'
import type { Order, CreateOrderData } from '@/types'

export const orderService = {
  async getAll(): Promise<Order[]> {
    const { data } = await api.get<Order[]>('/orders')
    return data
  },

  async getMyOrders(): Promise<Order[]> {
    const { data } = await api.get<Order[]>('/orders/my-orders')
    return data
  },

  async getById(id: string): Promise<Order> {
    const { data } = await api.get<Order>(`/orders/${id}`)
    return data
  },

  async create(order: CreateOrderData): Promise<Order> {
    const { data } = await api.post<Order>('/orders', order)
    return data
  },

  async update(id: string, order: Partial<Order>): Promise<Order> {
    const { data } = await api.patch<Order>(`/orders/${id}`, order)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/orders/${id}`)
  },
}
