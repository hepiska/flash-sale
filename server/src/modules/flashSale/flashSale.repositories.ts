import { IListResponseData } from '../common/interfaces/response.interface';
import { FlashSaleModel, IFlashSaleDocument } from './flashSale.model'



const flashSaleRepository = {
  getActiveFlashSales: async (currentDate: Date, page: number, limit: number): Promise<IListResponseData<IFlashSaleDocument>> => {
    const items = await FlashSaleModel.find({ isActive: true, startTime: { $lte: currentDate }, endTime: { $gte: currentDate } }).
      skip((page - 1) * limit).
      limit(limit);
    const total = await FlashSaleModel.countDocuments({ isActive: true, startTime: { $lte: currentDate }, endTime: { $gte: currentDate } });
    return {
      total,
      items,
      page,
      limit
    };
  },
  createFlashSale: async (data: { title: string; startTime: Date; endTime: Date }): Promise<IFlashSaleDocument> => {

    try {
      const flashSale = await FlashSaleModel.create(data);

      return flashSale;
    } catch (err) {
      throw err;
    }

  },
  getFlashSaleById: async (id: string): Promise<IFlashSaleDocument | null> => {
    const flashSale = await FlashSaleModel.findById(id);
    return flashSale;
  }
};

export default flashSaleRepository;