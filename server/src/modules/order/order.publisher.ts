import rabbit from "../../lib/queue";
import { ORDER_QUEUE_CHANNELS, ORDER_EXCHANGES } from "./order.constant";
import { IOrderDocument } from "./order.model";


const applyOrderPublisher = rabbit.createPublisher({
  confirm: true,
  // Enable retries
  maxAttempts: 2,
  // Optionally ensure the existence of an exchange before we use it
  exchanges: [
    {
      exchange: ORDER_EXCHANGES.ORDER_EVENTS,
      type: 'topic',
    }
  ],
});

export const publishApplyOrder = async (orderId: string, orderData: IOrderDocument) => {
  try {
    await applyOrderPublisher.send(
      {
        exchange: ORDER_EXCHANGES.ORDER_EVENTS,
        routingKey: orderData.productId.toString(),
      },
      { orderId, orderData },

    );
    console.log('Published apply order message:', { orderId, orderData });
  } catch (err) {
    console.error('Failed to publish apply order message:', err);
  }
}