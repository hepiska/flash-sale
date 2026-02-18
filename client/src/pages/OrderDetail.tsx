import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { orderService } from '@/services/orderService'
import dayjs from 'dayjs'
import { Card, Descriptions, Spin, Tag, Typography, Button, Space, Empty, Image, Row, Col } from 'antd'

const { Title, Text } = Typography

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getById(id as string),
    enabled: !!id,
    refetchInterval: 2000, // poll every 2s
    refetchIntervalInBackground: true, // optional
  })

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!order) {
    return <Empty description="Order not found" />
  }

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={2} style={{ marginBottom: 0 }}>
            Order Detail
          </Title>
          <Link to="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <Card title="Product Snapshot">
              {order.product ? (
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Image
                    alt={order.product.name}
                    src={order.product.imageUrl}
                    style={{ width: '100%', maxHeight: 280, objectFit: 'cover' }}
                    fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDQ4MCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQ4MCIgaGVpZ2h0PSIzMjAiIGZpbGw9IiNmMWYxZjEiLz48dGV4dCB4PSIyNDAiIHk9IjE3NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+"
                  />
                  <div>
                    <Text strong>{order.product.name}</Text>
                    {order.product.description && (
                      <div>
                        <Text type="secondary">{order.product.description}</Text>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Price</Text>
                    <Text>${order.product.price}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Stock</Text>
                    <Text>{order.product.stock}</Text>
                  </div>
                  <Link to={`/products/${order.productId}`}>
                    <Button block>View Product</Button>
                  </Link>
                </Space>
              ) : (
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Text type="secondary">No product snapshot available.</Text>
                  <Link to={`/products/${order.productId}`}>
                    <Button block>View Product</Button>
                  </Link>
                </Space>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={14}>
            <Card title="Order Information">
              <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label="Order ID">
                  <Text>{order.id}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag
                    color={
                      order.status === 'completed'
                        ? 'success'
                        : order.status === 'pending'
                          ? 'warning'
                          : 'default'
                    }
                  >
                    {order.status.toUpperCase()}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Product ID">
                  <Text>{order.productId}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Quantity">
                  <Text>{order.quantity}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Unit Price">
                  <Text>${order.unitPrice}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Total Price">
                  <Text strong>${order.totalPrice}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                  <Text>{dayjs(order.createdAt).format('MMM DD, YYYY hh:mm A')}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                  <Text>{dayjs(order.updatedAt).format('MMM DD, YYYY hh:mm A')}</Text>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}
