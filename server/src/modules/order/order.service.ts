import { IOrderCreateData } from "./order.interface";
import orderRepository from "./order.repository";
import { ClientError } from "../common/errors/clientError";
import productService from "../product/product.service";
import { ORDER_STATUS } from "./order.constant";
import { publishApplyOrder } from "./order.publisher";


const orderService = {
  createOrder: async (orderData: IOrderCreateData) => {
    const product = orderData.productSlug
      ? await productService.getProductBySlug(orderData.productSlug)
      : orderData.productId
        ? await productService.getProductById(orderData.productId)
        : null;
    if (!product) {
      throw new ClientError('Product not found', 404);
    }
    const normalizedProductId = product._id.toString();
    const prevOrder = await orderRepository.getOrderByProductAndOrderId(normalizedProductId, orderData.userName);
    console.log('Creating order with data:', orderData);

    if (prevOrder) {
      throw new ClientError('Duplicate order for the same product ', 400);
    }

    if (product.remainingStock < orderData.quantity) {
      throw new ClientError('Insufficient stock for the product', 400);
    }
    const { productSlug, ...createOrderData } = orderData;
    const createdOrder = await orderRepository.createOrder({
      ...createOrderData,
      productId: normalizedProductId,
      status: ORDER_STATUS.PENDING
    }, {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });


    await publishApplyOrder(createdOrder._id.toString(), createdOrder);
    // Logic to create an order
    return { message: 'Order created successfully', order: createdOrder };
  },

  applyOrder: async (orderId: string, orderData: IOrderCreateData) => {
    if (!orderData.productId) {
      await orderRepository.updateOrderStatus(orderId, ORDER_STATUS.CANCELLED, "Order cancelled due to missing product ID");
      return
    }
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
    return await orderRepository.getOrderByIdWithDetails(orderId);
  },
  getOrdersByUserName: async (userName: string) => {
    return await orderRepository.getOrderByUserName(userName, 1, 100);
  }

}

export default orderService;