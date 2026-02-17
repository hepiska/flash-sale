import request from 'supertest';
import flashSaleRepository from '../flashSale.repositories';
import flashSaleRouter from '../flashSale.controller';
import mongoose from 'mongoose';
describe('FlashSale Controller Integration', () => {

  beforeAll(async () => {
    // Setup any necessary data or state before tests run
    await flashSaleRepository.createFlashSale({
      title: 'Test Flash Sale',
      startTime: new Date(Date.now() - 1000 * 60 * 60), // Started 1 hour ago
      endTime: new Date(Date.now() + 1000 * 60 * 60), // Ends in 1 hour
    });


  });


  it('GET /flash-sales should return 200 for active flash sale', async () => {
    const res = await request(flashSaleRouter).get('/');
    expect(res.status).toBe(200);
    expect(res.body?.data?.items?.length).toBeGreaterThanOrEqual(1);
    const titles = res.body?.data?.items?.map((item: { title: string }) => item.title);
    expect(titles).toContain('Test Flash Sale');
  });

  it("GET /:id should return 404 for non-existent flash sale", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(flashSaleRouter).get(`/${nonExistentId}`);
    expect(res.status).toBe(404);
  });

  it("GET /:id should return 200 for existing flash sale", async () => {
    const flashSale = await flashSaleRepository.createFlashSale({
      title: 'Another Test Flash Sale',
      startTime: new Date(Date.now() - 1000 * 60 * 60), // Started 1 hour ago
      endTime: new Date(Date.now() + 1000 * 60 * 60), // Ends in 1 hour
    });

    const res = await request(flashSaleRouter).get(`/${flashSale._id.toString()}`);
    expect(res.status).toBe(200);
    expect(res.body?.data?.title).toBe('Another Test Flash Sale');
  })
});