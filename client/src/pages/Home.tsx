import { Card, Carousel, Empty, Spin, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { flashSaleService } from '@/services/flashSaleService'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

export default function Home() {
  const { data: flashSales, isLoading } = useQuery({
    queryKey: ['flash-sales', 'home'],
    queryFn: () => flashSaleService.getAll(1, 10),
  })

  const navigate = useNavigate()

  const handleSaleClick = (id: string) => {
    navigate(`/flash-sales/${id}`)
  }

  return (
    <div style={{ padding: '8px 0' }}>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <Spin size="large" />
        </div>
      ) : flashSales && flashSales.length > 0 ? (
        <Carousel dots>
          {flashSales.map((sale) => (
            <div key={sale._id}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
                <Card
                  onClick={() => handleSaleClick(sale._id)}
                  style={{ maxWidth: 720, width: '100%' }}
                  title={sale.title}
                >
                  <Paragraph style={{ marginBottom: 8 }}>
                    <Text strong>Start:</Text> {new Date(sale.startTime).toLocaleString()}
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 8 }}>
                    <Text strong>End:</Text> {new Date(sale.endTime).toLocaleString()}
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 0 }}>
                    <Text strong>Status:</Text> {sale.isActive ? 'Active' : 'Inactive'}
                  </Paragraph>
                </Card>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <Empty description="No flash sales available" />
      )}
    </div>
  )
}
