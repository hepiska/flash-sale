import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

export default async function globalSetup() {
  // it's needed in global space, because we don't want to create a new instance every test-suite
  process.env.NODE_ENV = 'test';
  process.env.RABBITMQ_HOST = process.env.RABBITMQ_HOST_TEST || process.env.RABBITMQ_HOST
  console.log('Setting up in-memory MongoDB instance for testing...');
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  const dbName = process.env.NODE_ENV === 'test' ? 'test_db' : 'flash_sale';
  const conn = await mongoose.createConnection(`${process.env.MONGO_URI}/${dbName}`).asPromise();
  await conn.dropDatabase();
  await conn.close();


};
