import { Card, Row, Col, Typography } from 'antd'
import { ShoppingOutlined, ThunderboltOutlined, FileTextOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <Title level={1}>Welcome to Flash Sale System</Title>
      <Paragraph style={{ fontSize: '18px', marginBottom: '32px' }}>
        Get amazing deals on products with limited-time flash sales!
      </Paragraph>
      <Row gutter={[24, 24]} style={{ marginTop: '48px' }}>
        <Col xs={24} md={8}>
          <Card hoverable>
            <ShoppingOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Browse Products</Title>
            <Paragraph>
              Explore our wide range of products available for purchase
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable>
            <ThunderboltOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Flash Sales</Title>
            <Paragraph>
              Don't miss out on limited-time deals with huge discounts
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable>
            <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Track Orders</Title>
            <Paragraph>
              Keep track of all your purchases and order history
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
