import productService from '../product.service';
import productRepository from '../product.repository';

describe('product.service', () => {
  it('delegates getSaleProducts to repository', async () => {
    const spy = jest
      .spyOn(productRepository, 'getSaleProducts')
      .mockResolvedValue({
        total: 1,
        items: [{ name: 'Test Product' }],
        page: 1,
        limit: 10,
      } as any);

    const result = await productService.getSaleProducts('sale1', 1, 10);

    expect(result).toEqual({
      total: 1,
      items: [{ name: 'Test Product' }],
      page: 1,
      limit: 10,
    });
    expect(spy).toHaveBeenCalledWith('sale1', 1, 10);

    spy.mockRestore();
  });
});
