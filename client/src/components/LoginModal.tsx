import { Form, Input, Button, Modal, Typography } from 'antd'
import { UserOutlined, } from '@ant-design/icons'
import { useAuth } from '@/contexts/AuthContext'

const { Title } = Typography



export default function LoginModal() {
  const { login, user } = useAuth()

  const [form] = Form.useForm()



  const handleSubmit = (values: { username: string }) => {
    login(values)
  }

  return (
    <Modal
      open={!user}
      footer={null}
      centered
      destroyOnHidden
      title={<Title level={4} style={{ marginBottom: 0 }}>Sign in</Title>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
