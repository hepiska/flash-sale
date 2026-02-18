
export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  saleId?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}