import express from 'express';
import request from 'supertest';
import flashSaleRouter from '../flashSale.controller';
import { getActiveFlashSales } from '../flashSale.service';
import { commonRequestQueryValidator } from '../../common/validator/request.validator';

jest.mock('../flashSale.service', () => ({
  getActiveFlashSales: jest.fn(),
}));

jest.mock('../../common/validator/request.validator', () => ({
  commonRequestQueryValidator: {
    parse: jest.fn(),
  },
}));


const mockedGetActiveFlashSales = getActiveFlashSales as jest.Mock;
const mockedParse = commonRequestQueryValidator.parse as jest.Mock;

describe('flashSale.controller', () => {
  const app = express();
  app.use('/flash-sales', flashSaleRouter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return flash sales with page and limit', async () => {
    mockedParse.mockReturnValue({ page: 1, limit: 10 });
    mockedGetActiveFlashSales.mockReturnValue([{ id: 'fs1' }]);

    const res = await request(app).get('/flash-sales');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [{ id: 'fs1' }],
      page: 1,
      limit: 10,
    });
    expect(mockedParse).toHaveBeenCalledWith({});
    expect(mockedGetActiveFlashSales).toHaveBeenCalledWith(1, 10);
  });

  it('should return 500 when validator throws', async () => {
    mockedParse.mockImplementation(() => {
      throw new Error('bad query');
    });

    const res = await request(app).get('/flash-sales');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
    expect(mockedGetActiveFlashSales).not.toHaveBeenCalled();
  });

  it('should return 500 when service throws', async () => {
    mockedParse.mockReturnValue({ page: 2, limit: 5 });
    mockedGetActiveFlashSales.mockImplementation(() => {
      throw new Error('service error');
    });

    const res = await request(app).get('/flash-sales');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});