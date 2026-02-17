import { IOrderCreateData } from "./order.interface";
import orderRepository from "./order.repository";
import { ClientError } from "../common/errors/clientError";
import productService from "../product/product.service";
import { ORDER_STATUS } from "./order.constant";
import { publishApplyOrder } from "./order.publisher";


const orderService = {
  createOrder: async (orderData: IOrderCreateData) => {

    const prevOrder = await orderRepository.getOrderByProductAndOrderId(orderData.productId, orderData.userName);
    console.log('Creating order with data:', orderData);

    if (prevOrder) {
      throw new ClientError('Duplicate order for the same product ', 400);
    }
    const product = await productService.getProductById(orderData.productId);
    if (!product) {
      throw new ClientError('Product not found', 404);
    }
    if (product.remainingStock < orderData.quantity) {
      throw new ClientError('Insufficient stock for the product', 400);
    }
    const createdOrder = await orderRepository.createOrder({
      ...orderData,
      status: ORDER_STATUS.PENDING
    });

    await publishApplyOrder(createdOrder._id.toString(), createdOrder);
    // Logic to create an order
    return { message: 'Order created successfully', order: createdOrder };
  },

  applyOrder: async (orderId: string, orderData: IOrderCreateData) => {
    const updateResult = await productService.reduceProductStock(orderData.productId, orderData.quantity);
    console.log('Applying order with ID:', orderId, 'and data:', orderData, 'Update result:', updateResult);
    if (!updateResult) {
      await orderRepository.updateOrderStatus(orderId, ORDER_STATUS.CANCELLED, "Order cancelled due to insufficient stock");
      return
    }
    console.log('Stock reduced successfully for order ID:', orderId);
    await orderRepository.updateOrderStatus(orderId, ORDER_STATUS.COMPLETED);
  },

  getOrderById: async (orderId: string) => {
    // Logic to retrieve an order by ID
    return { message: 'Order retrieved successfully', orderId };
  },

}

export default orderService;