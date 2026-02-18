import { useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { orderService } from '@/services/orderService'
import { useAuth } from '@/contexts/AuthContext'
import {
  Card,
  Col,
  Row,
  Typography,
  Spin,
  Image,
  Tag,
  Space,
  Divider,
  InputNumber,
  Button,
  Alert,
  message,
  Empty,
} from 'antd'
import LoginModal from '@/components/LoginModal'

const { Title, Text, Paragraph } = Typography

export default function DetailProduct() {
  const { id } = useParams<{ id: string }>()
  const { user, isAuthenticated } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const naivigate = useNavigate()

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id as string),
    enabled: !!id,
  })

  const totalPrice = useMemo(() => {
    if (!product) {
      return 0
    }
    return product.price * quantity
  }, [product, quantity])

  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useMutation({
    mutationFn: async () => {
      if (!product) {
        throw new Error('Product not found')
      }
      const userName = user ? `${user.username}`.trim() : ''
      if (!userName) {
        throw new Error('User information is incomplete')
      }
      return orderService.create({
        productId: product.id,
        quantity,
        totalPrice,
        orderDate: new Date().toISOString(),
        userName,
      })
    },
    onSuccess: (data) => {
      naivigate(`/orders/${data.id}`)
    },
    onError: (error) => {
      console.error('Failed to place order:', error)
      message.error(`Failed to place order: ${error.message}`)
    },
  })

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!product) {
    return <Empty description="Product not found" />
  }

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <Card>
          <Image
            alt={product.name}
            src={product.imageUrl}
            style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }}
            fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDQ4MCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQ4MCIgaGVpZ2h0PSIzMjAiIGZpbGw9IiNmMWYxZjEiLz48dGV4dCB4PSIyNDAiIHk9IjE3NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+"
          />
        </Card>
      </Col>
      <LoginModal></LoginModal>
      <Col xs={24} lg={12}>
        <Card>
          <Title level={2} style={{ marginBottom: 8 }}>
            {product.name}
          </Title>
          <Space size="middle" wrap style={{ marginBottom: 12 }}>
            <Tag color={product.isActive ? 'success' : 'default'}>
              {product.isActive ? 'Active' : 'Inactive'}
            </Tag>
            <Text type="secondary">Stock: {product.stock}</Text>
            <Text type="secondary">Price: ${product.price}</Text>

          </Space>

          {product.description && <Paragraph>{product.description}</Paragraph>}

          <Divider />

          <Title level={4} style={{ marginBottom: 8 }}>
            Place Order
          </Title>

          {!isAuthenticated && (
            <Alert
              type="info"
              message="Login required"
              description={
                <span>
                  Please <Link to="/login">login</Link> to place an order.
                </span>
              }
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>Quantity</Text>
              <InputNumber
                min={1}
                max={Math.max(1, 1)}
                value={quantity}
                onChange={(value) => setQuantity(value ?? 1)}
                disabled={product.stock === 0}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary">Total</Text>
              <Text strong>${totalPrice}</Text>
            </div>
            <Button
              type="primary"
              block
              disabled={!isAuthenticated || product.stock === 0}
              loading={isCreatingOrder}
              onClick={() => createOrder()}
            >
              Add to Order
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  )
}
