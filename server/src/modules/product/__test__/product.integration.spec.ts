import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';

import { ProductModel } from '../product.model';
import productRouter from '../product.controller';

describe('Product Controller Integration', () => {
  let saleId: mongoose.Types.ObjectId;
  const app = express();
  app.use('/products', productRouter);



  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    saleId = new mongoose.Types.ObjectId();

    await ProductModel.create([
      {
        name: 'Test Product A',
        totalStock: 100,
        remainingStock: 100,
        saleId,
        isActive: true,
      },
      {
        name: 'Test Product B',
        totalStock: 50,
        remainingStock: 50,
        saleId,
        isActive: true,
      },
      {
        name: 'Other Sale Product',
        totalStock: 30,
        remainingStock: 30,
        saleId: new mongoose.Types.ObjectId(),
        isActive: true,
      },
    ]);
  });

  it('GET /sale/:saleId should return 200 and sale products', async () => {
    const res = await request(app).get(`/products/sale/${saleId.toString()}`);

    expect(res.status).toBe(200);
    expect(res.body?.data?.items?.length).toBeGreaterThanOrEqual(2);
    expect(res.body?.data?.total).toBeGreaterThanOrEqual(2);
    const saleIds = res.body?.data?.items?.map((item: { saleId: string }) => item.saleId);
    expect(saleIds).toEqual(
      expect.arrayContaining([saleId.toString()])
    );
  });

  it('GET /sale/:saleId should return empty list for unknown sale', async () => {
    const unknownSaleId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/products/sale/${unknownSaleId}`);

    expect(res.status).toBe(200);
    expect(res.body?.data?.items).toEqual([]);
    expect(res.body?.data?.total).toBe(0);
  });
});
