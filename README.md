# Flash Sale System

A full-stack application for managing flash sales with real-time inventory tracking and user authentication.

## Project Structure

This monorepo contains two main applications:

- **`/server`** - NestJS backend with PostgreSQL
- **`/client`** - React frontend with Vite

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose (for PostgreSQL)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start PostgreSQL database:
```bash
docker-compose up -d
```

5. Run the backend:
```bash
npm run start:dev
```

The API will be running at `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Run the frontend:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`

## Features

### Backend Features
- User authentication with JWT
- Product management (CRUD operations)
- Flash sale creation and management
- Order processing with inventory tracking
- RESTful API endpoints
- PostgreSQL database with TypeORM
- Input validation and error handling
- CORS configuration

### Frontend Features
- User authentication (login/register)
- Product browsing
- Flash sale listings with countdown
- Order placement
- Order history tracking
- Responsive UI with Tailwind CSS
- shadcn/ui component library
- React Query for data fetching
- Protected routes

## Tech Stack

### Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Passport JWT
- bcrypt

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Query
- React Router v6
- Axios

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (authenticated)
- `PATCH /products/:id` - Update product (authenticated)
- `DELETE /products/:id` - Delete product (authenticated)

### Flash Sales
- `GET /flash-sales` - Get all flash sales
- `GET /flash-sales/active` - Get active flash sales
- `GET /flash-sales/:id` - Get flash sale by ID
- `POST /flash-sales` - Create flash sale (authenticated)
- `PATCH /flash-sales/:id` - Update flash sale (authenticated)
- `DELETE /flash-sales/:id` - Delete flash sale (authenticated)

### Orders
- `GET /orders` - Get all orders (authenticated)
- `GET /orders/my-orders` - Get user's orders (authenticated)
- `GET /orders/:id` - Get order by ID (authenticated)
- `POST /orders` - Create order (authenticated)
- `PATCH /orders/:id` - Update order (authenticated)
- `DELETE /orders/:id` - Delete order (authenticated)

## Database Schema

### Users
- id (UUID)
- email (unique)
- password (hashed)
- firstName
- lastName
- role
- timestamps

### Products
- id (UUID)
- name
- description
- price
- stock
- imageUrl
- isActive
- timestamps

### Flash Sales
- id (UUID)
- productId (foreign key)
- discountPrice
- discountPercentage
- availableQuantity
- maxPerOrder
- startTime
- endTime
- status
- timestamps

### Orders
- id (UUID)
- userId (foreign key)
- productId (foreign key)
- quantity
- unitPrice
- totalPrice
- status
- flashSaleId (optional)
- timestamps

## Development Workflow

1. Start the PostgreSQL database
2. Run the backend server
3. Run the frontend development server
4. Access the application at `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=flash_sale
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## License

MIT
