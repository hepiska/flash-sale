import { Router } from "express"
import orderService from "./order.service"
import { validateCreateOrderBody } from "./order.validator"
import { ClientError } from "../common/errors/clientError"
import "./order.consumer"

const orderRouter = Router()

orderRouter.post("/", async (req, res) => {
  try {
    const orderData = validateCreateOrderBody(req.body)
    const result = await orderService.createOrder(orderData)



    res.status(201).send(result)
  } catch (err) {
    console.error('Error creating order:', err)
    if (err instanceof ClientError) {
      res.status(err.statusCode).send({ error: err.message })
    } else if (err instanceof Error) {
      res.status(500).send({ error: "Internal Server Error" })
    }
  }
})



export default orderRouter


