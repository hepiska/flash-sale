import { useQuery } from '@tanstack/react-query'
import { flashSaleService } from '@/services/flashSaleService'
import { productService } from '@/services/productService'
import dayjs from 'dayjs'
import { Card, Row, Col, Typography, Tag, Spin, Space, Empty, Image, Divider } from 'antd'
import { ThunderboltOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

const { Title, Text, Paragraph } = Typography

export default function FlashSales() {
  const { id } = useParams<{ id: string }>()
  const navigation = useNavigate()

  const { data: flashSale, isLoading: isFlashSaleLoading } = useQuery({
    queryKey: ['flash-sale', id],
    queryFn: () => flashSaleService.getById(id as string),
    enabled: !!id,
  })

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['flash-sale-products', id],
    queryFn: () => productService.getSaleProducts(id as string, 1, 12),
    enabled: !!id,
  })

  if (isFlashSaleLoading || isProductsLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!flashSale) {
    return <Empty description="Flash sale not found" />
  }

  return (
    <div>
      <Card style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 8 }}>
          <ThunderboltOutlined /> {flashSale.title}
        </Title>
        <Space size="middle" wrap>
          <Tag color={flashSale.isActive ? 'success' : 'default'}>
            {flashSale.isActive ? 'Active' : 'Inactive'}
          </Tag>
          <Text type="secondary">
            <ClockCircleOutlined /> Start: {dayjs(flashSale.startTime).format('MMM DD, YYYY hh:mm A')}
          </Text>
          <Text type="secondary">
            <ClockCircleOutlined /> End: {dayjs(flashSale.endTime).format('MMM DD, YYYY hh:mm A')}
          </Text>
        </Space>
        {flashSale.description && (
          <Paragraph style={{ marginTop: 12 }}>{flashSale.description}</Paragraph>
        )}
      </Card>

      <Divider style={{ margin: '12px 0 20px' }} />

      <Title level={3} style={{ marginBottom: 16 }}>
        Products
      </Title>

      {products && products.length > 0 ? (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} md={12} lg={8} key={product.id}>
              <Card
                hoverable
                onClick={() => navigation(`/products/${product.id}`)}
                style={{
                  opacity: product.stock === 0 ? 0.5 : 1,
                  filter: product.stock === 0 ? 'grayscale(100%)' : 'none',
                }}
                cover={
                  <Image
                    alt={product.name}
                    src={product.imageUrl}
                    style={{
                      objectFit: 'cover',
                      height: 200,
                      filter: product.stock === 0 ? 'grayscale(100%)' : 'none',
                    }}
                    fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMyMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmMWYxZjEiLz48dGV4dCB4PSIxNjAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+"
                  />
                }
              >
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  <Text strong>{product.name}</Text>
                  {product.description && (
                    <Text type="secondary" style={{ display: 'block' }}>
                      {product.description}
                    </Text>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Stock:</Text>
                    <Text>{product.stock}</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No products in this flash sale" />
      )}
    </div>
  )
}
