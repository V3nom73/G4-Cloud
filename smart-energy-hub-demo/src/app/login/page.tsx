'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Form, Input, Button, Card, Typography, Space, Alert, Row, Col, Divider, Checkbox, App } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, TeamOutlined, DashboardOutlined, SaveOutlined, WifiOutlined, RobotOutlined, HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { message } = App.useApp();
  const { login } = useAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError('');

    const { username, password } = values;

    try {
      // Use the auth context login function
      await login(username, password);
      
      // Show success message based on user type
      if (username === 'admin') {
        message.success('Willkommen im Admin Dashboard!');
      } else {
        message.success('Willkommen in Ihrer Energiezentrale!');
      }
      
      // The login function handles the redirect, so we don't need router.push here
    } catch (err) {
      setError('Ungültiger Benutzername oder Passwort');
      setLoading(false);
    }
  };

  const MotionCard = motion(Card);

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)' }}>
      {/* Zurück-Button in der oberen linken Ecke */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          size="large"
          href="/"
          style={{ background: 'rgba(255, 255, 255, 0.9)', border: '1px solid #e8e8e8' }}
        >
          Zurück
        </Button>
      </div>
      
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 1000 }}
        >
          <Row gutter={48} align="middle">
            {/* Login Form */}
            <Col xs={24} lg={12}>
              <MotionCard 
                style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Space align="center">
                      <Button 
                        type="link" 
                        href="/"
                        style={{ padding: 0 }}
                      >
                        <Space align="center">
                          <DashboardOutlined style={{ fontSize: 40, color: '#52c41a' }} />
                          <Title level={2} style={{ margin: 0 }}>Smart Energy Hub</Title>
                        </Space>
                      </Button>
                    </Space>
                  </div>

                  <Divider style={{ margin: '16px 0' }} />

                  <Title level={3} style={{ textAlign: 'center', marginBottom: 8 }}>
                    Willkommen zurück
                  </Title>
                  <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
                    Melden Sie sich an, um auf Ihre Energiezentrale zuzugreifen
                  </Text>

                  <Form
                    form={form}
                    name="login"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    size="large"
                    layout="vertical"
                    requiredMark={false}
                    initialValues={{ remember: true }}
                  >
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: 'Bitte Benutzername eingeben!' }]}
                    >
                      <Input 
                        prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                        placeholder="Benutzername oder E-Mail"
                        autoFocus
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Bitte Passwort eingeben!' }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                        placeholder="Passwort"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Row justify="space-between" align="middle">
                        <Col>
                          <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Angemeldet bleiben</Checkbox>
                          </Form.Item>
                        </Col>
                        <Col>
                          <Button type="link" style={{ padding: 0 }}>
                            Passwort vergessen?
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>

                    {error && (
                      <Form.Item>
                        <Alert message={error} type="error" showIcon />
                      </Form.Item>
                    )}

                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        block 
                        loading={loading}
                        icon={<LoginOutlined />}
                        style={{ height: 48 }}
                      >
                        Anmelden
                      </Button>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Text style={{ display: 'block', textAlign: 'center' }}>
                          Noch kein Konto? {' '}
                          <Button type="link" style={{ padding: 0 }}>
                            Jetzt registrieren
                          </Button>
                        </Text>
                        <Text style={{ display: 'block', textAlign: 'center' }}>
                          <Button 
                            type="link" 
                            href="/"
                            style={{ padding: 0 }}
                            icon={<HomeOutlined />}
                          >
                            Zurück zur Startseite
                          </Button>
                        </Text>
                      </Space>
                    </Form.Item>
                  </Form>

                  <Divider plain>
                    <Text type="secondary" style={{ fontSize: 12 }}>DEMO ZUGÄNGE</Text>
                  </Divider>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Card 
                        hoverable 
                        style={{ textAlign: 'center', cursor: 'pointer' }}
                        onClick={() => {
                          message.info('Nutzen Sie: admin / admin');
                          // Auto-fill the form
                          form.setFieldsValue({ username: 'admin', password: 'admin' });
                        }}
                      >
                        <TeamOutlined style={{ fontSize: 24, color: '#722ed1', marginBottom: 8 }} />
                        <Text strong style={{ display: 'block' }}>Admin Demo</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>Für Installateure</Text>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card 
                        hoverable 
                        style={{ textAlign: 'center', cursor: 'pointer' }}
                        onClick={() => {
                          message.info('Nutzen Sie: user / user');
                          // Auto-fill the form
                          form.setFieldsValue({ username: 'user', password: 'user' });
                        }}
                      >
                        <UserOutlined style={{ fontSize: 24, color: '#1890ff', marginBottom: 8 }} />
                        <Text strong style={{ display: 'block' }}>Kunden Demo</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>Für Endnutzer</Text>
                      </Card>
                    </Col>
                  </Row>
                </Space>
              </MotionCard>
            </Col>

            {/* Info Section */}
            <Col xs={0} lg={12}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Space direction="vertical" size="large">
                  <Title level={2} style={{ color: '#141414' }}>
                    Ihre persönliche{' '}
                    <span style={{ 
                      background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Energiezentrale
                    </span>
                  </Title>
                  
                  <Text style={{ fontSize: 16, lineHeight: 1.8 }}>
                    Mit Smart Energy Hub haben Sie Ihre gesamte Energieanlage im Griff:
                  </Text>

                  <Space direction="vertical" size="middle">
                    <Card style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                      <Space>
                        <div style={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: '#52c41a'
                        }} />
                        <Text>Live-Überwachung aller Energieflüsse</Text>
                      </Space>
                    </Card>

                    <Card style={{ background: '#e6f7ff', border: '1px solid #91d5ff' }}>
                      <Space>
                        <div style={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: '#1890ff'
                        }} />
                        <Text>Intelligente Gerätesteuerung</Text>
                      </Space>
                    </Card>

                    <Card style={{ background: '#f9f0ff', border: '1px solid #d3adf7' }}>
                      <Space>
                        <div style={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: '#722ed1'
                        }} />
                        <Text>Automatische Kostenoptimierung</Text>
                      </Space>
                    </Card>
                  </Space>

                  <Card 
                    style={{ 
                      background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                      border: 'none',
                      color: 'white'
                    }}
                  >
                    <Space direction="vertical" size="small">
                      <Space>
                        <SaveOutlined style={{ fontSize: 24 }} />
                        <Title level={4} style={{ color: 'white', margin: 0 }}>
                          Sparpotential
                        </Title>
                      </Space>
                      <Title level={2} style={{ color: 'white', margin: 0 }}>
                        bis zu 40% [[memory:2385933]]
                      </Title>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        weniger Stromkosten durch intelligente Steuerung
                      </Text>
                    </Space>
                  </Card>

                  <Space direction="vertical" size="small">
                    <Space>
                      <WifiOutlined style={{ color: '#52c41a' }} />
                      <Text strong>Funktioniert mit allen gängigen Geräten</Text>
                    </Space>
                    <Space>
                      <RobotOutlined style={{ color: '#722ed1' }} />
                      <Text strong>KI-Optimierung inklusive</Text>
                    </Space>
                  </Space>
                </Space>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Content>
    </Layout>
  );
} 