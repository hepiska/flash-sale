import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../../../app';
import { ProductModel } from '../../product/product.model';
import orderModel from '../order.model';

jest.mock('../order.consumer', () => ({}));
jest.mock('../order.publisher', () => ({
  publishApplyOrder: jest.fn(),
}));

describe('Order Controller Integration', () => {
  const app = createApp();
  let productId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    const product = await ProductModel.create({
      name: 'Integration Product',
      totalStock: 10,
      remainingStock: 10,
      isActive: true,
    });

    productId = product._id;
  });

  afterAll(async () => {
    await orderModel.deleteMany({});
    await ProductModel.deleteMany({});
  });

  it('POST /orders creates an order', async () => {
    const payload = {
      userName: 'user1',
      productId: productId.toString(),
      quantity: 1,
      totalPrice: 10,
      orderDate: new Date().toISOString(),
    };

    const res = await request(app).post('/orders').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Order created successfully');
    expect(res.body).toHaveProperty('order');

    const savedOrder = await orderModel.findOne({
      productId,
      userName: 'user1',
    });

    expect(savedOrder).not.toBeNull();
    expect(savedOrder?.status).toBe('pending');
  });

  it('POST /orders returns 400 for duplicate order', async () => {
    const payload = {
      userName: 'user1',
      productId: productId.toString(),
      quantity: 1,
      totalPrice: 10,
      orderDate: new Date().toISOString(),
    };

    const res = await request(app).post('/orders').send(payload);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
