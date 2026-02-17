import mongoose from "mongoose";
import { ORDER_STATUS } from "./order.constant";


export interface IOrderDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  userName: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  status: ORDER_STATUS;
  systemNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  userName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true, min: 0 },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  systemNote: { type: String },
}, {
  timestamps: true
});

const orderModel = mongoose.model<IOrderDocument>('orders', OrderSchema);

export default orderModel;