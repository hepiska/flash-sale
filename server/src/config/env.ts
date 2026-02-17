import dotenv from 'dotenv'

dotenv.config()

export interface AppConfig {
  port: number
  nodeEnv: string
  mongoUri: string
  rabbitmqUri?: string
}

export const config: AppConfig = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/flash_sale',
  rabbitmqUri: process.env.RABBITMQ_HOST || 'amqp://guest:guest@localhost:5672'
}