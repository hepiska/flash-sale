import request from 'supertest'
import express from 'express';
import healthRouter from '../health.controller'

describe('Health Check', () => {
  const app = express()
  app.use('/health', healthRouter)

  it('returns ok status', async () => {
    const response = await request(app).get('/health')

    if (response.status !== 200) {
      throw new Error(`Expected 200, received ${response.status}`)
    }

    if (response.body.status !== 'ok') {
      throw new Error('Expected body.status to be "ok"')
    }
  })
});
