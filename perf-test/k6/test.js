import http from 'k6/http';
import { check, sleep } from 'k6';


const TEST_PRODUCT_SLUG = 'aurora-noise-cancelling-buds';

export const options = {
  stages: [
    { duration: '5s', target: 5000 }, // Ramp up to 5000 users
    { duration: '10s', target: 0 },    // Ramp down
  ],
};

export default function () {
  const url = __ENV.TARGET_URL || 'http://host.docker.internal:4000/orders';
  const payload = JSON.stringify({
    productSlug: TEST_PRODUCT_SLUG,
    userName: `user_${Math.floor(Math.random() * 10000)}`,
    quantity: 1,
    totalPrice: 10,
    orderDate: new Date().toISOString(),
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 201': (r) => r.status === 201,
    'is status 400 (Sold Out)': (r) => r.status === 400,
  });

  sleep(0.1); // Users don't click faster than 100ms
}