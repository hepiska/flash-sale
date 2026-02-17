import { IListResponseData } from '../common/interfaces/response.interface';
import { ProductModel, ProductDocument } from './product.model'

const productRepository = {
  async getSaleProducts(saleId: string, page: number, limit: number): Promise<IListResponseData<ProductDocument>> {
    const items = await ProductModel.find({ saleId, isActive: true })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await ProductModel.countDocuments({ saleId, isActive: true });
    return {
      total,
      items,
      page,
      limit
    };
  },
  async reduceProductStock(productId: string, qty: number) {
    return await ProductModel.findOneAndUpdate({
      _id: productId,
      remainingStock: { $gte: qty }
    }, { $inc: { remainingStock: -qty } });
  },
  async getProductById(productId: string): Promise<ProductDocument | null> {
    return await ProductModel.findById(productId);
  }

}

export default productRepository;