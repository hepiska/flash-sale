import { IListResponseData } from '../common/interfaces/response.interface';
import { ORDER_STATUS } from './order.constant';
import { IOrderCreateData } from './order.interface';
import orderModel, { IOrderDocument } from './order.model';

const orderRepository = {
  createOrder: async (orderData: IOrderCreateData): Promise<IOrderDocument> => {
    const order = new orderModel(orderData);
    return await order.save();
  },
  getOrderById: async (orderId: string): Promise<IOrderDocument | null> => {
    return await orderModel.findById(orderId);
  },
  getOrderByUserName: async (userName: string, page: number, limit: number): Promise<IListResponseData<IOrderDocument>> => {
    const orders = await orderModel.find({ userName })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await orderModel.countDocuments({ userName });
    return { total, items: orders, page, limit };
  },
  getOrderByProductAndOrderId: async (productId: string, userName: string): Promise<IOrderDocument | null> => {
    return await orderModel.findOne({ productId, userName }, {
      _id: 1,
      userName: 1,
      productId: 1,
      quantity: 1,
    });
  },
  updateOrderStatus: async (orderId: string, status: ORDER_STATUS, systemNote?: string): Promise<IOrderDocument | null> => {
    return await orderModel.findByIdAndUpdate(orderId, { status, systemNote }, { new: true });
  }
};

export default orderRepository;