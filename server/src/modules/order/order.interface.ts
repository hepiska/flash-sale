import mongoose from "mongoose";
import { IProduct } from "../common/interfaces/product.interface";
import { ORDER_STATUS } from "./order.constant";


export interface IOrderCreateData {
  userName: string,
  productSlug?: string,
  productId?: string,
  quantity: number,
  totalPrice: number,
  orderDate: Date,
  status: 'pending' | 'completed' | 'cancelled'
}


export interface IOrderDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  product: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
  };
  userName: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  status: ORDER_STATUS;
  systemNote?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IOrderProductSnapshot {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}