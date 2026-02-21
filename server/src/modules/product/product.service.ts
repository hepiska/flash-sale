import productRepository from "./product.repository";
import { ProductDocument } from "./product.model";
import { IListResponseData } from "../common/interfaces/response.interface";

const productService = {
  getSaleProducts: (saleId: string, page: number, limit: number): Promise<IListResponseData<ProductDocument>> => {
    return productRepository.getSaleProducts(saleId, page, limit);
  },
  reduceProductStock: async (productId: string, qty: number) => {
    return await productRepository.reduceProductStock(productId, qty);
  },
  getProductById: async (productId: string): Promise<ProductDocument | null> => {
    return await productRepository.getProductById(productId);
  },
  getProductBySlug: async (slug: string): Promise<ProductDocument | null> => {
    return await productRepository.getProductBySlug(slug);
  }
}


export default productService;