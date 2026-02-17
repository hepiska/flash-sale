import mongoose from 'mongoose';

export default async function globalTeardown() {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  const instance = (global as any).__MONGOINSTANCE;
  if (instance) {
    await instance.stop();
  }
}