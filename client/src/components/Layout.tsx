import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Layout as AntLayout, Menu, Button, Space, Typography } from 'antd'
import { HomeOutlined, ShoppingOutlined, ThunderboltOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Header, Content } = AntLayout
const { Text } = Typography

export default function Layout() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: <Link to="/products">Products</Link>,
    },
    {
      key: '/flash-sales',
      icon: <ThunderboltOutlined />,
      label: <Link to="/flash-sales">Flash Sales</Link>,
    },
    ...(isAuthenticated
      ? [
        {
          key: '/orders',
          icon: <FileTextOutlined />,
          label: <Link to="/orders">My Orders</Link>,
        },
      ]
      : []),
  ]

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '40px', color: '#1890ff' }}>
            Flash Sale
          </div>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ flex: 1, minWidth: 0, border: 'none' }}
          />
        </div>
        <Space>
          {isAuthenticated ? (
            <>
              <Text>
                <UserOutlined /> {user?.firstName} {user?.lastName}
              </Text>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Register</Button>
              </Link>
            </>
          )}
        </Space>
      </Header>
      <Content style={{ padding: '24px 50px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Outlet />
      </Content>
    </AntLayout>
  )
}
