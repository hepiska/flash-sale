import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { Card, Table, Tag, Typography, Spin, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Order } from '@/types'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const { Title } = Typography

export default function Orders() {
  const { user } = useAuth()

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders', user?.username],
    queryFn: () => orderService.getMyOrders(user?.username || ''),
    enabled: !!user?.username,
  })

  const columns: ColumnsType<Order> = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => `${id.slice(0, 8)}...`,
    },
    {
      title: 'Product',
      dataIndex: ['product', 'name'],
      key: 'product',
      render: (name: string) => name || 'N/A',
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'completed'
              ? 'success'
              : status === 'pending'
                ? 'warning'
                : 'default'
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link to={`/orders/${record.id}`}>
          <Button size="small">View</Button>
        </Link>
      ),
    },
  ]

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>My Orders</Title>
      <Card title="Order History">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  )
}
