import { useQuery } from '@tanstack/react-query'
import { flashSaleService } from '@/services/flashSaleService'
import dayjs from 'dayjs'
import { Card, Row, Col, Typography, Tag, Spin, Divider, Space } from 'antd'
import { ThunderboltOutlined, ClockCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function FlashSales() {
  const { data: flashSales, isLoading } = useQuery({
    queryKey: ['flash-sales'],
    queryFn: flashSaleService.getAll,
  })

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        <ThunderboltOutlined /> Flash Sales
      </Title>
      <Row gutter={[16, 16]}>
        {flashSales?.map((sale) => (
          <Col xs={24} md={12} lg={8} key={sale.id}>
            <Card
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong>{sale.product?.name || 'Product'}</Text>
                  <Tag color={sale.status === 'active' ? 'success' : 'default'}>
                    {sale.status}
                  </Tag>
                </div>
              }
              hoverable
            >
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Original Price:</Text>
                  <Text delete>${sale.product?.price}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Flash Sale Price:</Text>
                  <Text strong style={{ color: '#ff4d4f', fontSize: 16 }}>
                    ${sale.discountPrice}
                  </Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Discount:</Text>
                  <Tag color="green">{sale.discountPercentage}% OFF</Tag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Available:</Text>
                  <Text>{sale.availableQuantity} units</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Max per order:</Text>
                  <Text>{sale.maxPerOrder}</Text>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    <ClockCircleOutlined /> Start Time:
                  </Text>
                  <Text>{dayjs(sale.startTime).format('MMM DD, YYYY hh:mm A')}</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    <ClockCircleOutlined /> End Time:
                  </Text>
                  <Text>{dayjs(sale.endTime).format('MMM DD, YYYY hh:mm A')}</Text>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
