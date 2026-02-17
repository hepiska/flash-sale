import express from 'express';
import request from 'supertest';
import orderRouter from '../order.controller';
import orderService from '../order.service';
import { validateCreateOrderBody } from '../order.validator';
import { ClientError } from '../../common/errors/clientError';

jest.mock('../order.service', () => ({
  __esModule: true,
  default: {
    createOrder: jest.fn(),
  },
}));

jest.mock('../order.validator', () => ({
  validateCreateOrderBody: jest.fn(),
}));

jest.mock('../order.consumer', () => ({}));

describe('order.controller', () => {
  const app = express();
  app.use(express.json());
  app.use('/orders', orderRouter);

  const mockedCreateOrder = orderService.createOrder as jest.Mock;
  const mockedValidate = validateCreateOrderBody as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 201 on successful order creation', async () => {
    const orderData = {
      userName: 'user1',
      productId: 'prod1',
      quantity: 2,
      totalPrice: 20,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };

    mockedValidate.mockReturnValue(orderData);
    mockedCreateOrder.mockResolvedValue({ message: 'Order created successfully', order: { id: '1' } });

    const res = await request(app).post('/orders').send(orderData);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'Order created successfully', order: { id: '1' } });
    expect(mockedValidate).toHaveBeenCalledWith(orderData);
    expect(mockedCreateOrder).toHaveBeenCalledWith(orderData);
  });

  it('returns client error when validator throws ClientError', async () => {
    mockedValidate.mockImplementation(() => {
      throw new ClientError('Invalid payload', 400);
    });

    const res = await request(app).post('/orders').send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid payload' });
    expect(mockedCreateOrder).not.toHaveBeenCalled();
  });

  it('returns client error when service throws ClientError', async () => {
    const orderData = {
      userName: 'user1',
      productId: 'prod1',
      quantity: 2,
      totalPrice: 20,
      orderDate: new Date(),
      status: 'pending',
    };

    mockedValidate.mockReturnValue(orderData);
    mockedCreateOrder.mockRejectedValue(new ClientError('Duplicate order', 400));

    const res = await request(app).post('/orders').send(orderData);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Duplicate order' });
  });

  it('returns 500 when service throws generic error', async () => {
    const orderData = {
      userName: 'user1',
      productId: 'prod1',
      quantity: 2,
      totalPrice: 20,
      orderDate: new Date(),
      status: 'pending',
    };

    mockedValidate.mockReturnValue(orderData);
    mockedCreateOrder.mockRejectedValue(new Error('service error'));

    const res = await request(app).post('/orders').send(orderData);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});
