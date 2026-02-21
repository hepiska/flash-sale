import orderService from '../order.service';
import orderRepository from '../order.repository';
import productService from '../../product/product.service';
import { publishApplyOrder } from '../order.publisher';
import { ClientError } from '../../common/errors/clientError';
import { ORDER_STATUS } from '../order.constant';
import mongoose from 'mongoose';

jest.mock('../order.repository', () => ({
  __esModule: true,
  default: {
    createOrder: jest.fn(),
    getOrderByProductAndOrderId: jest.fn(),
    updateOrderStatus: jest.fn(),
    getOrderById: jest.fn(),
    getOrderByUserName: jest.fn(),
  },
}));

jest.mock('../../product/product.service', () => ({
  __esModule: true,
  default: {
    getProductBySlug: jest.fn(),
    getProductById: jest.fn(),
    reduceProductStock: jest.fn(),
  },
}));

jest.mock('../order.publisher', () => ({
  publishApplyOrder: jest.fn(),
}));

describe('order.service', () => {
  const baseOrderData = {
    userName: 'user1',
    productSlug: 'prod-1',
    quantity: 2,
    totalPrice: 20,
    orderDate: new Date(),
    status: ORDER_STATUS.PENDING,
  };

  const applyOrderData = {
    ...baseOrderData,
    productId: 'prod1',
  };

  const mockedRepo = orderRepository as jest.Mocked<typeof orderRepository>;
  const mockedProductService = productService as jest.Mocked<typeof productService>;
  const mockedPublish = publishApplyOrder as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws ClientError for duplicate order', async () => {
    mockedRepo.getOrderByProductAndOrderId.mockResolvedValue({ _id: '1' } as any);
    mockedProductService.getProductBySlug.mockResolvedValue({ _id: 'prod1', remainingStock: 5 } as any);

    await expect(orderService.createOrder(baseOrderData)).rejects.toBeInstanceOf(ClientError);
    expect(mockedProductService.getProductBySlug).toHaveBeenCalledWith(baseOrderData.productSlug);
  });

  it('throws ClientError when product not found', async () => {
    mockedRepo.getOrderByProductAndOrderId.mockResolvedValue(null);
    mockedProductService.getProductBySlug.mockResolvedValue(null);

    await expect(orderService.createOrder(baseOrderData)).rejects.toBeInstanceOf(ClientError);
  });

  it('throws ClientError when stock is insufficient', async () => {
    mockedRepo.getOrderByProductAndOrderId.mockResolvedValue(null);
    mockedProductService.getProductBySlug.mockResolvedValue({ _id: 'prod1', remainingStock: 1 } as any);

    await expect(orderService.createOrder(baseOrderData)).rejects.toBeInstanceOf(ClientError);
  });

  it('creates order and publishes apply order', async () => {
    mockedRepo.getOrderByProductAndOrderId.mockResolvedValue(null);
    mockedProductService.getProductBySlug.mockResolvedValue({
      _id: { toString: () => 'prod1' },
      remainingStock: 5,
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'image.jpg',
    } as any);

    const createdOrder = {
      _id: { toString: () => 'order1' },
      productId: 'prod1',
    } as any;

    mockedRepo.createOrder.mockResolvedValue(createdOrder);

    const result = await orderService.createOrder(baseOrderData as any);

    expect(mockedRepo.createOrder).toHaveBeenCalledWith({
      userName: baseOrderData.userName,
      quantity: baseOrderData.quantity,
      totalPrice: baseOrderData.totalPrice,
      orderDate: baseOrderData.orderDate,
      productId: 'prod1',
      status: ORDER_STATUS.PENDING,
    }, {
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'image.jpg',
    });
    expect(mockedPublish).toHaveBeenCalledWith('order1', createdOrder);
    expect(result).toEqual({ message: 'Order created successfully', order: createdOrder });
  });

  it('applyOrder cancels when stock cannot be reduced', async () => {
    mockedProductService.reduceProductStock.mockResolvedValue(null);

    await orderService.applyOrder('order1', applyOrderData as any);

    expect(mockedRepo.updateOrderStatus).toHaveBeenCalledWith(
      'order1',
      ORDER_STATUS.CANCELLED,
      'Order cancelled due to insufficient stock'
    );
  });

  it('applyOrder completes when stock reduced', async () => {
    mockedProductService.reduceProductStock.mockResolvedValue({ _id: 'p1' } as any);

    await orderService.applyOrder('order1', applyOrderData as any);

    expect(mockedRepo.updateOrderStatus).toHaveBeenCalledWith('order1', ORDER_STATUS.COMPLETED);
  });
});
