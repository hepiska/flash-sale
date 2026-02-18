import { Router } from 'express';
import productService from './product.service';
import z, { ZodError } from 'zod';
const productRouter = Router();


productRouter.get('/sale/:saleId', async (req, res) => {
  try {
    const saleId = req.params.saleId;
    const querySchema = z.object({
      page: z.coerce.number().int().positive().optional().default(1),
      limit: z.coerce.number().int().positive().optional().default(10),
    });

    const { page, limit } = querySchema.parse(req.query);

    const products = await productService.getSaleProducts(saleId, page, limit);
    return res.status(200).send({ data: products, page, limit });
  } catch (err) {

    if (err instanceof ZodError) {
      return res.status(400).send({ error: err.message });
    }

    return res.status(500).send({ error: 'Internal Server Error' });
  }
})

productRouter.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    return res.status(200).send({ data: product });
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
})


export default productRouter;
