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

orderRouter.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }
    return res.status(200).send({ data: order });
  } catch (err) {
    console.error('Error fetching order by ID:', err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
})

orderRouter.get("/users/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const orders = await orderService.getOrdersByUserName(userName);
    return res.status(200).send({ data: orders });
  } catch (err) {
    console.error('Error fetching orders by user name:', err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});



export default orderRouter


