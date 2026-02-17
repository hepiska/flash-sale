import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import healthRouter from './modules/health/health.controller'
import productRouter from './modules/product/product.controller'
import flashSaleRouter from './modules/flashSale/flashSale.controller'
import orderRouter from './modules/order/order.controller'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined'));

  app.use("/health", healthRouter)
  app.use("/products", productRouter)
  app.use("/flash-sales", flashSaleRouter)
  app.use("/orders", orderRouter)

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  return app
}
