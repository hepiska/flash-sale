import { connectDatabase, disconnectDatabase } from './lib/database';

beforeAll(async () => {
  jest.setTimeout(20000);
  await connectDatabase();
});


afterAll(async () => {
  await disconnectDatabase();
});
