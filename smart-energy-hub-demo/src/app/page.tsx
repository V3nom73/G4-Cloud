'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Row, Col, Card, Space, Badge, Statistic, Carousel, Tag, Avatar, Divider, message, Rate, Steps } from 'antd';
import { 
  ThunderboltOutlined, 
  LineChartOutlined, 
  SafetyCertificateOutlined, 
  RobotOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  GlobalOutlined,
  DashboardOutlined,
  ApiOutlined,
  CloudOutlined,
  BarChartOutlined,
  HomeOutlined,
  MobileOutlined,
  BellOutlined,
  ClockCircleOutlined,
  WifiOutlined,
  SaveOutlined,
  LockOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const MotionCard = motion(Card);

export default function LandingPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const features = [
    {
      icon: <DashboardOutlined style={{ fontSize: 48, color: '#52c41a' }} />,
      title: 'Alles im Blick',
      description: 'Überwachen Sie Ihre gesamte Energieanlage in Echtzeit - übersichtlich und verständlich',
      color: '#52c41a'
    },
    {
      icon: <SaveOutlined style={{ fontSize: 48, color: '#1890ff' }} />,
      title: 'Geld sparen',
      description: 'Optimieren Sie Ihren Energieverbrauch und sparen Sie bis zu 40% Ihrer Stromkosten',
      color: '#1890ff'
    },
    {
      icon: <WifiOutlined style={{ fontSize: 48, color: '#722ed1' }} />,
      title: 'Herstellerunabhängig',
      description: 'Funktioniert mit allen gängigen Geräten - Fronius, Tesla, SMA und viele mehr',
      color: '#722ed1'
    },
    {
      icon: <RobotOutlined style={{ fontSize: 48, color: '#fa8c16' }} />,
      title: 'Intelligente Steuerung',
      description: 'KI-basierte Optimierung lernt Ihre Gewohnheiten und spart automatisch Energie',
      color: '#fa8c16'
    }
  ];

  const tiers = [
    {
      name: 'Basic',
      price: '14.90',
      features: [
        'Live-Monitoring aller Geräte',
        'Störungsmeldungen per App',
        '7 Tage Datenhistorie',
        'Basis-Energiestatistiken'
      ],
      color: '#52c41a',
      icon: <DashboardOutlined />
    },
    {
      name: 'Professional',
      price: '44.90',
      features: [
        'Alles aus Basic',
        'Geräte fernsteuern',
        'Automatisierungen erstellen',
        '30 Tage Datenhistorie',
        'Wetterbasierte Optimierung'
      ],
      color: '#1890ff',
      popular: true,
      icon: <ApiOutlined />
    },
    {
      name: 'Enterprise',
      price: '119.90',
      features: [
        'Alles aus Professional',
        'KI-Energieoptimierung',
        'Unbegrenzte Datenhistorie',
        'Persönlicher Support',
        'Erweiterte Analysen'
      ],
      color: '#722ed1',
      icon: <CloudOutlined />
    }
  ];

  const benefits = [
    { title: 'Stromkosten senken', value: 40, suffix: '%', description: 'weniger Stromkosten' },
    { title: 'Autarkie erhöhen', value: 80, suffix: '%', description: 'Eigenversorgung' },
    { title: 'CO2 sparen', value: 2.5, suffix: 't', description: 'pro Jahr' },
    { title: 'Immer informiert', value: 24, suffix: '/7', description: 'Überwachung' }
  ];

  const steps = [
    {
      title: 'Anmelden',
      description: 'Kostenloses Konto erstellen',
      icon: <UserOutlined />
    },
    {
      title: 'Geräte verbinden',
      description: 'Automatische Geräteerkennung',
      icon: <WifiOutlined />
    },
    {
      title: 'Energie sparen',
      description: 'Sofort mit dem Sparen beginnen',
      icon: <SaveOutlined />
    }
  ];

  const testimonials = [
    {
      name: 'Familie Müller',
      location: 'Zürich',
      rating: 5,
      text: 'Seit wir Smart Energy Hub nutzen, haben wir unsere Stromkosten um 35% reduziert. Die App ist super einfach zu bedienen!'
    },
    {
      name: 'Thomas K.',
      location: 'Bern',
      rating: 5,
      text: 'Endlich sehe ich, wohin mein Solarstrom fließt. Die automatische Steuerung der Wallbox ist genial!'
    },
    {
      name: 'Sandra L.',
      location: 'Basel',
      rating: 5,
      text: 'Die KI-Optimierung hat sich schon im ersten Monat bezahlt gemacht. Sehr empfehlenswert!'
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Navigation */}
      <Header style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e8e8e8',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0 50px'
      }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Space align="center" size="middle">
              <ThunderboltOutlined style={{ fontSize: 32, color: '#52c41a' }} />
              <Title level={4} style={{ margin: 0 }}>Smart Energy Hub</Title>
            </Space>
          </Col>
          <Col>
            <Space size="middle">
              <Button type="text" size="large">
                Funktionen
              </Button>
              <Button type="text" size="large">
                Preise
              </Button>
              <Button type="text" size="large">
                Support
              </Button>
              <Button type="primary" size="large" icon={<UserOutlined />} href="/login">
                Anmelden
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ 
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
            padding: '80px 50px',
            textAlign: 'center'
          }}>
            <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
              <Badge.Ribbon text="30 Tage kostenlos testen" color="green">
                <Title level={1} style={{ fontSize: 48, marginBottom: 24 }}>
                  Ihre Energie.{' '}
                  <span style={{ 
                    background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Intelligent gesteuert.
                  </span>
                </Title>
              </Badge.Ribbon>
              
              <Paragraph style={{ fontSize: 20, maxWidth: 800, margin: '0 auto' }}>
                Verbinden Sie alle Ihre Energiegeräte in einer App. 
                Sparen Sie bis zu 40% Stromkosten durch intelligente Steuerung und behalten Sie immer den Überblick.
              </Paragraph>

              <Space size="large">
                <Button type="primary" size="large" icon={<PlayCircleOutlined />} href="/login">
                  Jetzt kostenlos testen
                </Button>
                <Button size="large" icon={<MobileOutlined />}>
                  App herunterladen
                </Button>
              </Space>

              {/* Benefits */}
              <Row gutter={[24, 24]} style={{ marginTop: 60 }}>
                {benefits.map((benefit, index) => (
                  <Col xs={24} sm={12} lg={6} key={index}>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        hoverable
                        style={{ textAlign: 'center', height: '100%' }}
                        className="metric-card"
                      >
                        <Title level={2} style={{ color: '#52c41a', margin: 0 }}>
                          <CountUp end={benefit.value as number} duration={2} suffix={benefit.suffix} />
                        </Title>
                        <Text strong>{benefit.title}</Text>
                        <br />
                        <Text type="secondary">{benefit.description}</Text>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Space>
          </div>
        </motion.div>

        {/* How it works */}
        <div style={{ padding: '80px 50px', background: '#fff' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>
            So einfach geht's
          </Title>
          
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Steps current={-1}>
              {steps.map((step, index) => (
                <Step 
                  key={index}
                  title={step.title} 
                  description={step.description}
                  icon={
                    <Avatar 
                      size={48} 
                      style={{ backgroundColor: '#52c41a' }}
                    >
                      {step.icon}
                    </Avatar>
                  }
                />
              ))}
            </Steps>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Button type="primary" size="large" href="/login">
              Jetzt starten
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ padding: '80px 50px', background: '#f5f5f5' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>
            Ihre Vorteile mit Smart Energy Hub
          </Title>
          
          <Row gutter={[32, 32]} style={{ maxWidth: 1200, margin: '0 auto' }}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <MotionCard
                  hoverable
                  style={{ height: '100%', textAlign: 'center' }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    {feature.icon}
                    <Title level={4}>{feature.title}</Title>
                    <Text type="secondary">{feature.description}</Text>
                  </Space>
                </MotionCard>
              </Col>
            ))}
          </Row>
        </div>

        {/* Pricing Section */}
        <div style={{ padding: '80px 50px', background: '#fff' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>
            Transparente Preise
          </Title>
          <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 60, fontSize: 16 }}>
            Wählen Sie das Paket, das zu Ihnen passt. Jederzeit kündbar.
          </Text>
          
          <Row gutter={[32, 32]} style={{ maxWidth: 1000, margin: '0 auto' }}>
            {tiers.map((tier, index) => (
              <Col xs={24} sm={24} lg={8} key={index}>
                <Badge.Ribbon text="Beliebt" color="blue" style={{ display: tier.popular ? 'block' : 'none' }}>
                  <Card
                    hoverable
                    style={{ 
                      height: '100%',
                      borderTop: `4px solid ${tier.color}`,
                      transform: tier.popular ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
                      <Avatar size={64} style={{ backgroundColor: tier.color }}>
                        {tier.icon}
                      </Avatar>
                      <Title level={3}>{tier.name}</Title>
                      <div>
                        <Title level={2} style={{ margin: 0 }}>{tier.price} CHF</Title>
                        <Text type="secondary">pro Monat</Text>
                      </div>
                      <Divider />
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        {tier.features.map((feature, i) => (
                          <div key={i} style={{ textAlign: 'left' }}>
                            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                            <Text>{feature}</Text>
                          </div>
                        ))}
                      </Space>
                      <Button 
                        type={tier.popular ? 'primary' : 'default'} 
                        block 
                        size="large"
                        href="/login"
                      >
                        30 Tage testen
                      </Button>
                    </Space>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>
        </div>

        {/* Testimonials */}
        <div style={{ padding: '80px 50px', background: '#f5f5f5' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>
            Das sagen unsere Kunden
          </Title>
          
          <Row gutter={[32, 32]} style={{ maxWidth: 1200, margin: '0 auto' }}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} sm={24} lg={8} key={index}>
                <Card style={{ height: '100%' }}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Rate disabled defaultValue={testimonial.rating} />
                    <Paragraph style={{ fontStyle: 'italic' }}>
                      "{testimonial.text}"
                    </Paragraph>
                    <div>
                      <Text strong>{testimonial.name}</Text>
                      <br />
                      <Text type="secondary">{testimonial.location}</Text>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Energy Flow Preview */}
        <div style={{ padding: '80px 50px', background: '#fff' }}>
          <Row gutter={[48, 48]} align="middle" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large">
                <Title level={2}>Alles im Blick - in Echtzeit</Title>
                <Paragraph style={{ fontSize: 16 }}>
                  Mit Smart Energy Hub sehen Sie auf einen Blick, wie viel Energie Ihre Solaranlage 
                  produziert, wie viel Sie verbrauchen und wie viel in der Batterie gespeichert ist.
                </Paragraph>
                <Space direction="vertical" size="small">
                  <Text><CheckCircleOutlined style={{ color: '#52c41a' }} /> Live-Daten aller Ihrer Geräte</Text>
                  <Text><CheckCircleOutlined style={{ color: '#52c41a' }} /> Verständliche Visualisierungen</Text>
                  <Text><CheckCircleOutlined style={{ color: '#52c41a' }} /> Historische Auswertungen</Text>
                  <Text><CheckCircleOutlined style={{ color: '#52c41a' }} /> Störungsmeldungen per Push</Text>
                </Space>
                <Button type="primary" size="large" href="/login">
                  Demo anschauen
                </Button>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="glass-effect" style={{ padding: 24 }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Title level={4}>Ihr Energiefluss</Title>
                    </Col>
                    <Col>
                      <Badge status="processing" text="Live" />
                    </Col>
                  </Row>
                  
                  <Row gutter={[24, 24]} justify="center">
                    <Col span={8} style={{ textAlign: 'center' }}>
                      <Avatar size={80} style={{ backgroundColor: '#fadb14' }}>
                        <ThunderboltOutlined style={{ fontSize: 40 }} />
                      </Avatar>
                      <Title level={5} style={{ marginTop: 16 }}>Solar</Title>
                      <Title level={3} style={{ margin: 0 }}>2.5 kW</Title>
                    </Col>
                    <Col span={8} style={{ textAlign: 'center' }}>
                      <Avatar size={80} style={{ backgroundColor: '#1890ff' }}>
                        <HomeOutlined style={{ fontSize: 40 }} />
                      </Avatar>
                      <Title level={5} style={{ marginTop: 16 }}>Haus</Title>
                      <Title level={3} style={{ margin: 0 }}>1.8 kW</Title>
                    </Col>
                    <Col span={8} style={{ textAlign: 'center' }}>
                      <Avatar size={80} style={{ backgroundColor: '#52c41a' }}>
                        <DashboardOutlined style={{ fontSize: 40 }} />
                      </Avatar>
                      <Title level={5} style={{ marginTop: 16 }}>Batterie</Title>
                      <Title level={3} style={{ margin: 0 }}>85%</Title>
                    </Col>
                  </Row>

                  <Card style={{ background: 'linear-gradient(135deg, #f6ffed 0%, #e6f7ff 100%)' }}>
                    <Space>
                      <SaveOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                      <div>
                        <Text strong>Sie sparen gerade</Text>
                        <br />
                        <Text type="secondary">4.80 CHF heute gespart</Text>
                      </div>
                    </Space>
                  </Card>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>

        {/* CTA Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          padding: '80px 50px',
          textAlign: 'center',
          color: 'white'
        }}>
          <Title level={2} style={{ color: 'white', marginBottom: 24 }}>
            Starten Sie jetzt Ihre Energiewende
          </Title>
          <Paragraph style={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.9)', maxWidth: 600, margin: '0 auto 40px' }}>
            Testen Sie Smart Energy Hub 30 Tage kostenlos und unverbindlich. 
            Keine Kreditkarte erforderlich.
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" icon={<PlayCircleOutlined />} href="/login" style={{ background: 'white', color: '#52c41a' }}>
              Kostenlos starten
            </Button>
            <Button size="large" ghost icon={<CustomerServiceOutlined />}>
              Beratung anfordern
            </Button>
          </Space>
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center', background: '#001529', color: 'white', padding: '48px 50px' }}>
        <Row gutter={[48, 24]} style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Col xs={24} sm={8}>
            <Space direction="vertical" size="small">
              <Title level={4} style={{ color: 'white' }}>Smart Energy Hub</Title>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                Ihre intelligente Energiezentrale für nachhaltiges Wohnen.
              </Text>
            </Space>
          </Col>
          <Col xs={24} sm={8}>
            <Space direction="vertical" size="small">
              <Title level={5} style={{ color: 'white' }}>Produkt</Title>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Funktionen</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Preise</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Kompatible Geräte</Text>
            </Space>
          </Col>
          <Col xs={24} sm={8}>
            <Space direction="vertical" size="small">
              <Title level={5} style={{ color: 'white' }}>Support</Title>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Hilfe-Center</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Kontakt</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Status</Text>
            </Space>
          </Col>
        </Row>
        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Text style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
          © 2024 Smart Energy Hub. Alle Rechte vorbehalten.
        </Text>
      </Footer>
    </Layout>
  );
}
