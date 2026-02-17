# Flash Sale System - Frontend

React frontend for Flash Sale system with Vite, TypeScript, and Tailwind CSS.

## Features

- User authentication (login/register)
- Browse products
- View active flash sales
- Place orders
- Track order history
- Responsive design with Tailwind CSS
- shadcn/ui components
- React Query for data fetching

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Query (TanStack Query)
- React Router v6
- Axios

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your backend API URL (default: `http://localhost:3000`).

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

The application will be available at `http://localhost:5173`

## Project Structure

```
client/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Layout.tsx   # Main layout with navigation
│   │   └── PrivateRoute.tsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/           # Custom hooks
│   │   └── use-toast.ts
│   ├── lib/             # Utilities
│   │   ├── api.ts       # Axios instance
│   │   └── utils.ts     # Helper functions
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Products.tsx
│   │   ├── FlashSales.tsx
│   │   └── Orders.tsx
│   ├── services/        # API services
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   ├── flashSaleService.ts
│   │   └── orderService.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Available Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/products` - Browse all products
- `/flash-sales` - View active flash sales
- `/orders` - View order history (protected route)

## Features

### Authentication
- JWT-based authentication
- Token stored in localStorage
- Auto-redirect on 401 responses
- Protected routes for authenticated users

### Data Fetching
- React Query for efficient data fetching
- Automatic refetching and caching
- Optimistic updates
- Loading and error states

### UI Components
- Button, Input, Label from shadcn/ui
- Toast notifications
- Responsive navigation
- Form validation

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Adding shadcn/ui Components

You can add more shadcn/ui components using the CLI:

```bash
npx shadcn-ui@latest add [component-name]
```

For example:
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```
