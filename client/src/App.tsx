import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import DetailProduct from '@/pages/DetailProduct'
import FlashSales from '@/pages/FlashSales'
import Orders from '@/pages/Orders'
import OrderDetail from '@/pages/OrderDetail'
import PrivateRoute from '@/components/PrivateRoute'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products/:id" element={<DetailProduct />} />
            <Route path="flash-sales/:id" element={<FlashSales />} />
            <Route
              path="orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="orders/:id"
              element={
                <PrivateRoute>
                  <OrderDetail />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App
