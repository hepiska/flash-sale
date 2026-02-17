import orderService from '../order.service';
import '../../../lib/queue';

const onMock = jest.fn();
let capturedHandler: ((msg: any) => Promise<void>) | undefined;

jest.mock('../../../lib/queue', () => ({
  __esModule: true,
  default: {
    createConsumer: jest.fn((_config, handler) => {
      capturedHandler = handler;
      return { on: onMock };
    }),
  },
}));

jest.mock('../order.service', () => ({
  __esModule: true,
  default: {
    applyOrder: jest.fn(),
  },
}));

// Import after mocks to register the consumer
import '../order.consumer';

describe('order.consumer', () => {
  const mockedApplyOrder = orderService.applyOrder as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing when message is null', async () => {
    await capturedHandler?.(null);

    expect(mockedApplyOrder).not.toHaveBeenCalled();
  });

  it('does nothing when message body is missing', async () => {
    await capturedHandler?.({});

    expect(mockedApplyOrder).not.toHaveBeenCalled();
  });

  it('calls applyOrder when message body is present', async () => {
    const orderData = { productId: 'p1', quantity: 1 };

    await capturedHandler?.({ body: { orderId: 'o1', orderData } });

    expect(mockedApplyOrder).toHaveBeenCalledWith('o1', orderData);
  });

});
