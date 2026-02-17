const sendMock = jest.fn();

jest.mock('../../../lib/queue', () => ({
  __esModule: true,
  default: {
    createPublisher: jest.fn(() => ({
      send: sendMock,
    })),
  },
}));

import { ORDER_EXCHANGES } from '../order.constant';
import { publishApplyOrder } from '../order.publisher';

describe('order.publisher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('publishes apply order event', async () => {
    const orderData = { productId: 'product-1' } as any;

    await publishApplyOrder('order-1', orderData);

    expect(sendMock).toHaveBeenCalledWith(
      {
        exchange: ORDER_EXCHANGES.ORDER_EVENTS,
        routingKey: 'product-1',
      },
      { orderId: 'order-1', orderData }
    );
  });

  it('handles publish errors without throwing', async () => {
    sendMock.mockRejectedValue(new Error('publish error'));

    await expect(publishApplyOrder('order-1', { productId: 'product-1' } as any)).resolves.toBeUndefined();
  });
});
