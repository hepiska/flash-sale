import api from '@/lib/api'
import type { Order, CreateOrderData, IProductSnapshot } from '@/types'
import { AxiosError } from 'axios'

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

type OrderApi = {
  _id: string
  productId: string
  product?: IProductSnapshot
  userName: string
  quantity: number
  totalPrice: number
  orderDate: string
  status: string
  systemNote?: string
  createdAt: string
  updatedAt: string
}

type CreateOrderResponse = {
  message: string
  order: OrderApi
}

type OrderResponse = {
  data: OrderApi
}

const mapOrder = (order: OrderApi): Order => ({
  id: order._id,
  userId: order.userName,
  productId: order.productId,
  product: order.product,
  quantity: order.quantity,
  unitPrice: order.quantity ? order.totalPrice / order.quantity : 0,
  totalPrice: order.totalPrice,
  status: order.status,
  flashSaleId: undefined,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
})

export const orderService = {
  async create(order: CreateOrderData & { userName: string; totalPrice: number; orderDate: string }): Promise<Order> {
    try {
      const { data } = await api.post<CreateOrderResponse>('/orders', order)
      return mapOrder(data.order)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data.error
        throw new Error(errorMessage)
      }
      throw error
    }
  },

  async getAll(): Promise<Order[]> {
    return []
  },

  async getMyOrders(userName: string): Promise<Order[]> {
    const { data } = await api.get<ApiListResponse<OrderApi>>(`/orders/users/${userName}`)
    return data.data.items.map(mapOrder)
  },

  async getById(id: string): Promise<Order> {
    const { data } = await api.get<OrderResponse>(`/orders/${id}`)
    return mapOrder(data.data)
  },

  async update(): Promise<Order> {
    throw new Error('Not supported by API')
  },

  async delete(): Promise<void> {
    throw new Error('Not supported by API')
  },
}
