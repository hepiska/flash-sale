import rabbit from "../../lib/queue";
import { ORDER_EXCHANGES, ORDER_QUEUE_CHANNELS } from "./order.constant";
import orderService from "./order.service";


const orderApplyConsumer = rabbit.createConsumer({
  exchanges: [
    {
      exchange: ORDER_EXCHANGES.ORDER_EVENTS,
      type: 'topic',
    }
  ],
  queueBindings: [{ exchange: ORDER_EXCHANGES.ORDER_EVENTS, routingKey: '*' }],

  noAck: false
}, async (msg) => {
  console.log('Received message in order apply consumer:', msg?.body)
  if (!msg) {
    console.warn('Received null message, skipping')
    return
  }
  if (msg.body) {
    const { orderId, orderData } = msg.body
    await orderService.applyOrder(orderId, orderData);

  }


});


orderApplyConsumer.on('error', (err) => {
  console.error('Error in order apply consumer:', err)
})