import { Card, Typography, Empty, Button } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

export default function Products() {
  return (
    <Card>
      <Title level={2} style={{ marginBottom: 8 }}>
        Products
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Browse products from a flash sale.
      </Paragraph>
      <Empty description="Select a flash sale to view products">
        <Link to="/">
          <Button type="primary">Go to Home</Button>
        </Link>
      </Empty>
    </Card>
  )
}
