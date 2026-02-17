import mongoose, { Document } from 'mongoose';


export interface IFlashSaleDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  imageUrl?: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}



const FlashSaleSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String },
  // Sale Window
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  // Operational toggle
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Critical: Indexing for performance
// Helps the landing page find active sales quickly
FlashSaleSchema.index({ startTime: 1, endTime: 1, isActive: 1 });

export const FlashSaleModel = mongoose.model<IFlashSaleDocument>('flashsales', FlashSaleSchema);