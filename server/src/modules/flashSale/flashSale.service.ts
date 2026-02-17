
import { ClientError, ClientErrorStatus } from '../common/errors/clientError';
import flashSaleRepository from './flashSale.repositories';


const getActiveFlashSales = (page: number, limit: number) => {
  const now = new Date();
  return flashSaleRepository.getActiveFlashSales(now, page, limit);
};

const getFlashSaleById = async (id: string) => {
  const flashSale = await flashSaleRepository.getFlashSaleById(id);

  if (!flashSale) {
    throw new ClientError('Flash Sale not found', ClientErrorStatus.NOT_FOUND);
  }
  return flashSale;
}

export { getActiveFlashSales, getFlashSaleById };