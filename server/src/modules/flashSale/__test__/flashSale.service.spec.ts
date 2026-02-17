
import { getActiveFlashSales } from '../flashSale.service'
import flashSaleRepository from '../flashSale.repositories'

describe('flashSale service', () => {
  it('delegates pagination args to repository', () => {
    const page = 3
    const limit = 15
    const fakeResult = [{ title: 'Night sale' }]

    const spy = jest
      .spyOn(flashSaleRepository, 'getActiveFlashSales')
      .mockReturnValue(fakeResult as any)

    const result = getActiveFlashSales(page, limit)

    expect(result).toBe(fakeResult)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(expect.any(Date), page, limit)

    spy.mockRestore()
  })
})
