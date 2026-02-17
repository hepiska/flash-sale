export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface FlashSale {
  id: string
  productId: string
  product?: Product
  discountPrice: number
  discountPercentage: number
  availableQuantity: number
  maxPerOrder: number
  startTime: string
  endTime: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  productId: string
  product?: Product
  quantity: number
  unitPrice: number
  totalPrice: number
  status: string
  flashSaleId?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface CreateOrderData {
  productId: string
  quantity: number
  flashSaleId?: string
}
