import Router from 'express';
import { getActiveFlashSales, getFlashSaleById } from './flashSale.service';
import { commonRequestQueryValidator } from '../common/validator/request.validator';
import { ClientError, } from '../common/errors/clientError';
const flashSaleRouter = Router();

flashSaleRouter.get('/', async (req, res) => {
  try {
    const { page, limit } = commonRequestQueryValidator.parse(req.query);

    const flashSales = await getActiveFlashSales(page, limit);

    if (!flashSales) {
      return res.status(404).send({ error: 'Flash sales not found' });
    }

    return res.status(200).send({ data: flashSales, page, limit });
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

flashSaleRouter.get('/:id', async (req, res) => {
  try {

    const flashSale = await getFlashSaleById(req.params.id);

    return res.status(200).send({ data: flashSale });

  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).send({ error: error.message, details: error.details });
    }

    return res.status(500).send({ error: 'Internal Server Error' });
  }

});

export default flashSaleRouter;
