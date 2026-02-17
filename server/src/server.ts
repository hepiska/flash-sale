import { createApp } from './app'
import { config } from './config/env'
import { connectDatabase } from './lib/database'
import rabbit from './lib/queue'

async function bootstrap() {
  try {
    await connectDatabase()

    rabbit.on('error', (err) => {
      console.error('RabbitMQ connection error:', err)
    })
    rabbit.on('connection', () => {
      console.log('RabbitMQ connected')
    })

    const app = createApp()

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port} in ${config.nodeEnv} mode`)
    })
  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

bootstrap()
