

export interface IOrderCreateData {
  userName: string,
  productId: string,
  quantity: number,
  totalPrice: number,
  orderDate: Date,
  status: 'pending' | 'completed' | 'cancelled'
}