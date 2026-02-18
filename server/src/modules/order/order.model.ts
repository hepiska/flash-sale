import mongoose from "mongoose";
import { IOrderDocument } from "./order.interface";


const orderProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String
}, { _id: false });




const OrderSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  product: { type: orderProductSchema, required: true },
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