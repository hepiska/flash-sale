# Flash Sale Express Server

Express.js backend scaffolded with TypeScript, MongoDB, and Mongoose.

## Features

- Structured domain modules (e.g., `product` controller/model/repository`)
- Health check route (`GET /health`)
- MongoDB connection handled via Mongoose
- Automated testing with Jest (ts-jest + supertest)

## Getting Started

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Scripts

- `npm run dev` – start the server with ts-node-dev
- `npm run build` – emit compiled JavaScript to `dist`
- `npm start` – run the compiled server
- `npm test` – run the Jest suite (unit + request tests)

## Project Structure

```
src/
  app.ts               # Express application factory
  server.ts            # Entry point
  config/env.ts        # Environment handling
  lib/database.ts      # MongoDB connection helpers
  modules/
    health/            # Health check route
    product/           # Example domain module (controller/model/repository)
```
