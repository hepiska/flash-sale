import express from 'express';
import request from 'supertest';
import { ZodError } from 'zod';
import productRouter from '../product.controller';
import productService from '../product.service';

jest.mock('../product.service', () => ({
  __esModule: true,
  default: {
    getSaleProducts: jest.fn(),
    reduceProductStock: jest.fn(),
    getProductById: jest.fn(),
  },
}));

describe('product.controller', () => {
  const app = express();
  app.use('/products', productRouter);

  const mockedGetSaleProducts = productService.getSaleProducts as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });



  it('returns products with page and limit', async () => {
    mockedGetSaleProducts.mockResolvedValue({
      total: 1,
      items: [{ id: 'p1' }],
      page: 2,
      limit: 5,
    });

    const res = await request(app).get('/products/sale/sale123?page=2&limit=5');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: {
        total: 1,
        items: [{ id: 'p1' }],
        page: 2,
        limit: 5,
      },
      page: 2,
      limit: 5,
    });
    expect(mockedGetSaleProducts).toHaveBeenCalledWith('sale123', 2, 5);
  });

  it('returns 400 when service throws ZodError', async () => {
    mockedGetSaleProducts.mockRejectedValue(new ZodError([]));

    const res = await request(app).get('/products/sale/sale123');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 500 when service throws generic error', async () => {
    mockedGetSaleProducts.mockRejectedValue(new Error('service error'));

    const res = await request(app).get('/products/sale/sale123');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});
