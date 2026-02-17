import mongoose from 'mongoose'
import { config } from '../config/env'

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  mongoose.set('strictQuery', true)
  mongoose.set('debug', true)
  await mongoose.connect(config.mongoUri)
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    return
  }

  await mongoose.disconnect()
}
