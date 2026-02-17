import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { Card, Row, Col, Typography, Tag, Spin, Image } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { Meta } = Card

export default function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  })

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Products</Title>
      <Row gutter={[16, 16]}>
        {products?.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                product.imageUrl ? (
                  <Image
                    alt={product.name}
                    src={product.imageUrl}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                    <ShoppingCartOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
                  </div>
                )
              }
            >
              <Meta
                title={product.name}
                description={
                  <Paragraph ellipsis={{ rows: 2 }}>
                    {product.description}
                  </Paragraph>
                }
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <Text strong style={{ fontSize: 18 }}>${product.price}</Text>
                <Tag color="blue">Stock: {product.stock}</Tag>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
