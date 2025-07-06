'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Card, 
  Button, 
  Space, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Badge, 
  Progress,
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Switch,
  Slider,
  Alert,
  Tag,
  Tabs,
  List,
  Timeline,
  Tooltip,
  App
} from 'antd'
import {
  HomeOutlined,
  ThunderboltOutlined,
  ThunderboltFilled,
  CarOutlined,
  FireOutlined,
  BulbOutlined,
  CloudOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  RiseOutlined,
  FallOutlined,
  DollarOutlined,
  RobotOutlined,
  ClockCircleOutlined,
  LineChartOutlined,
  ExperimentOutlined,
  CrownOutlined
} from '@ant-design/icons'
import { Area, Column, Gauge, Line } from '@ant-design/charts'
import { useAuth } from '@/hooks/useAuth'

const { Title, Text, Paragraph } = Typography

// Mock-Daten für Energiefluss
const generateEnergyFlow = () => ({
  solar: Math.floor(Math.random() * 3000 + 1500),
  house: Math.floor(Math.random() * 2000 + 800),
  battery: Math.floor(Math.random() * 1000 - 500), // kann negativ sein
  grid: Math.floor(Math.random() * 1000 - 500), // kann negativ sein
  wallbox: Math.floor(Math.random() * 11000)
})

// Mock-Daten für Tagesstatistiken
const todayStats = {
  produced: 18.2,
  consumed: 12.4,
  stored: 4.8,
  sold: 1.0,
  saved: 4.80,
  autarky: 89
}

// Mock-Daten für Geräte
const devices = [
  { id: 1, name: 'Wallbox', icon: <CarOutlined />, status: 'charging', power: 11000, controllable: true },
  { id: 2, name: 'Wärmepumpe', icon: <FireOutlined />, status: 'auto', power: 2100, controllable: true },
  { id: 3, name: 'Beleuchtung', icon: <BulbOutlined />, status: 'on', power: 200, controllable: true },
  { id: 4, name: 'Pool-Pumpe', icon: <CloudOutlined />, status: 'off', power: 0, controllable: true }
]

// Mock-Daten für Automatisierungen
const automations = [
  { id: 1, name: 'Solarüberschuss → Wallbox', active: true, icon: <CarOutlined /> },
  { id: 2, name: 'Nachtstrom → Wärmepumpe', active: true, icon: <FireOutlined /> },
  { id: 3, name: 'Wetterprognose → Batterieladung', active: false, icon: <CloudOutlined /> },
  { id: 4, name: 'Strompreis-Optimierung', active: true, icon: <DollarOutlined /> }
]

// Mock-Daten für Alarme
const alarms = [
  { time: '12:34', type: 'warning', message: 'Wechselrichter kurzzeitig offline' },
  { time: '10:15', type: 'success', message: 'Batterie vollständig geladen' },
  { time: '08:00', type: 'info', message: 'Morgendliche Optimierung abgeschlossen' }
]

// Mock-Daten für KI-Vorhersagen (Tier 3)
const predictions = [
  { type: 'solar', tomorrow: '+30%', recommendation: 'Batterie heute Abend nicht voll laden' },
  { type: 'price', peak: 'Dienstag 16:00', recommendation: 'Laden auf 22:00 verschieben' },
  { type: 'weather', forecast: 'Sonnig', recommendation: 'Maximale Solarproduktion erwartet' }
]

export default function DashboardPage() {
  const router = useRouter()
  const { logout, user } = useAuth()
  const { message } = App.useApp()
  const [energyFlow, setEnergyFlow] = useState(generateEnergyFlow())
  const [loading, setLoading] = useState(false)
  const [deviceModalVisible, setDeviceModalVisible] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<any>(null)
  
  // Get user tier from auth context
  const userTier: 'basic' | 'professional' | 'enterprise' | 'admin' = 
    user?.role === 'admin' ? 'enterprise' : 
    user?.tier === 'Professional' ? 'professional' : 
    user?.tier === 'Enterprise' ? 'enterprise' : 'basic'

  // Update Energiefluss alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyFlow(generateEnergyFlow())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profil
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Einstellungen
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Abmelden
      </Menu.Item>
    </Menu>
  )

  const handleDeviceControl = (device: any) => {
    if (userTier === 'basic') {
      message.warning('Gerätesteuerung ist ab dem Professional Tier verfügbar!')
      return
    }
    setSelectedDevice(device)
    setDeviceModalVisible(true)
  }

  const handleAutomationToggle = (automation: any) => {
    if (userTier === 'basic') {
      message.warning('Automatisierungen sind ab dem Professional Tier verfügbar!')
      return
    }
    message.success(`Automatisierung "${automation.name}" ${automation.active ? 'deaktiviert' : 'aktiviert'}`)
  }

  // Chart-Daten für Tagesverlauf
  const dailyChartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    solar: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 4000 * (i >= 6 && i <= 18 ? 1 : 0)),
    consumption: 800 + Math.random() * 1200,
    battery: Math.random() * 2000
  }))

  const chartConfig = {
    data: dailyChartData,
    xField: 'hour',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="large">
              <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
                <HomeOutlined /> Smart Energy Hub
              </Title>
              <Tag color={userTier === 'enterprise' ? 'gold' : userTier === 'professional' ? 'blue' : 'default'}>
                {userTier === 'enterprise' ? <CrownOutlined /> : null}
                {userTier.charAt(0).toUpperCase() + userTier.slice(1)}
              </Tag>
            </Space>
          </Col>
          <Col>
            <Space>
              <Badge count={3}>
                <Button icon={<BellOutlined />} shape="circle" />
              </Badge>
              <Dropdown overlay={userMenu} placement="bottomRight">
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </Space>
          </Col>
        </Row>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Energiefluss-Visualisierung */}
        <Card 
          title={
            <Space>
              <ThunderboltOutlined />
              <span>Energiefluss-Visualisierung</span>
              {userTier !== 'basic' && <Tag color="green">Interaktiv</Tag>}
              <Button 
                size="small" 
                icon={<SyncOutlined spin={loading} />} 
                onClick={() => {
                  setLoading(true)
                  setTimeout(() => {
                    setEnergyFlow(generateEnergyFlow())
                    setLoading(false)
                    message.success('Energiefluss aktualisiert')
                  }, 1000)
                }}
              >
                Aktualisieren
              </Button>
            </Space>
          }
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '40px 20px', background: '#fafafa', borderRadius: 8 }}>
            <Row gutter={[48, 48]} justify="center" align="middle">
              {/* Solar */}
              <Col span={6} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, color: '#faad14' }}>☀️</div>
                <Title level={5}>Solar</Title>
                <Text strong style={{ fontSize: 18, color: '#52c41a' }}>
                  {(energyFlow.solar / 1000).toFixed(1)} kW
                </Text>
                {userTier === 'enterprise' && (
                  <div>
                    <Text type="success" style={{ fontSize: 12 }}>
                      <RiseOutlined /> +15% KI-optimiert
                    </Text>
                  </div>
                )}
              </Col>

              {/* Haus */}
              <Col span={6} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48 }}>🏠</div>
                <Title level={5}>Haus</Title>
                <Text strong style={{ fontSize: 18 }}>
                  {(energyFlow.house / 1000).toFixed(1)} kW
                </Text>
                {userTier === 'enterprise' && (
                  <div>
                    <Text type="danger" style={{ fontSize: 12 }}>
                      <FallOutlined /> -8% reduziert
                    </Text>
                  </div>
                )}
              </Col>

              {/* Batterie */}
              <Col span={6} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48 }}>🔋</div>
                <Title level={5}>Batterie</Title>
                <Text strong style={{ fontSize: 18, color: energyFlow.battery > 0 ? '#52c41a' : '#ff4d4f' }}>
                  {Math.abs(energyFlow.battery / 1000).toFixed(1)} kW
                </Text>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {energyFlow.battery > 0 ? 'Lädt' : 'Entlädt'}
                  </Text>
                </div>
                {userTier === 'enterprise' && (
                  <Tag color="blue" style={{ marginTop: 4 }}>
                    <ExperimentOutlined /> KI-gesteuert
                  </Tag>
                )}
              </Col>

              {/* Netz */}
              <Col span={6} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48 }}>🌐</div>
                <Title level={5}>Netz</Title>
                <Text strong style={{ fontSize: 18, color: energyFlow.grid > 0 ? '#ff4d4f' : '#52c41a' }}>
                  {Math.abs(energyFlow.grid / 1000).toFixed(1)} kW
                </Text>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {energyFlow.grid > 0 ? 'Bezug' : 'Einspeisung'}
                  </Text>
                </div>
                {userTier === 'enterprise' && energyFlow.grid <= 0 && (
                  <Tag color="green" style={{ marginTop: 4 }}>
                    <RobotOutlined /> KI-optimiert
                  </Tag>
                )}
              </Col>
            </Row>

            {/* Energiefluss-Pfeile */}
            <div style={{ position: 'relative', height: 60, marginTop: -30 }}>
              <div style={{ position: 'absolute', left: '12.5%', top: 30, fontSize: 24 }}>↓</div>
              <div style={{ position: 'absolute', left: '37.5%', top: 30, fontSize: 24 }}>↑</div>
              <div style={{ position: 'absolute', left: '62.5%', top: 30, fontSize: 24 }}>↕</div>
              <div style={{ position: 'absolute', left: '87.5%', top: 30, fontSize: 24 }}>
                {energyFlow.grid > 0 ? '↑' : '↓'}
              </div>
            </div>
          </div>
        </Card>

        {/* Tagesstatistiken */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Erzeugt"
                value={todayStats.produced}
                suffix="kWh"
                prefix={<ThunderboltOutlined style={{ color: '#faad14' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Verbraucht"
                value={todayStats.consumed}
                suffix="kWh"
                prefix={<HomeOutlined style={{ color: '#1890ff' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Gespeichert"
                value={todayStats.stored}
                suffix="kWh"
                prefix={<ThunderboltFilled style={{ color: '#52c41a' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Verkauft"
                value={todayStats.sold}
                suffix="kWh"
                prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Geräte-Steuerung (Tier 2+) */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <Space>
                  <SettingOutlined />
                  <span>Geräte-Steuerung</span>
                  {userTier === 'basic' && <Tag>Professional erforderlich</Tag>}
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <Row gutter={[16, 16]}>
                {devices.map(device => (
                  <Col span={12} key={device.id}>
                    <Card 
                      hoverable={userTier !== 'basic'}
                      onClick={() => handleDeviceControl(device)}
                      style={{ 
                        textAlign: 'center',
                        opacity: userTier === 'basic' ? 0.6 : 1,
                        cursor: userTier === 'basic' ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{device.icon}</div>
                      <Title level={5}>{device.name}</Title>
                      <Tag color={device.status === 'on' || device.status === 'charging' ? 'green' : 
                                  device.status === 'auto' ? 'blue' : 'default'}>
                        {device.status === 'on' ? 'Ein' : 
                         device.status === 'off' ? 'Aus' : 
                         device.status === 'charging' ? 'Lädt' : 'Auto'}
                      </Tag>
                      <div style={{ marginTop: 8 }}>
                        <Text strong>{(device.power / 1000).toFixed(1)} kW</Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* Automatisierungen (Tier 2+) */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <Space>
                  <RobotOutlined />
                  <span>Aktive Automatisierungen</span>
                  {userTier === 'basic' && <Tag>Professional erforderlich</Tag>}
                  {userTier === 'professional' && <Tag color="blue">3/20</Tag>}
                  {userTier === 'enterprise' && <Tag color="gold">Unbegrenzt</Tag>}
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <List
                dataSource={automations}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Switch 
                        checked={item.active} 
                        onChange={() => handleAutomationToggle(item)}
                        disabled={userTier === 'basic'}
                      />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={item.icon} style={{ backgroundColor: '#52c41a' }} />}
                      title={item.name}
                      description={
                        <Space>
                          <Tag color={item.active ? 'green' : 'default'}>
                            {item.active ? 'Aktiv' : 'Pausiert'}
                          </Tag>
                          <Text type="secondary">Letzte Ausführung: vor 2 Std</Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* KI-Optimierung (Tier 3) */}
        {userTier === 'enterprise' && (
          <Card 
            title={
              <Space>
                <RobotOutlined />
                <span>KI-Optimierung & Vorhersagen</span>
                <Tag color="gold">Enterprise</Tag>
              </Space>
            }
            style={{ marginBottom: 24 }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                  <Statistic
                    title="Einsparung heute"
                    value={todayStats.saved}
                    prefix="CHF"
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <Text type="secondary">Monat: CHF 131.00</Text>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                  <Statistic
                    title="Autarkiegrad"
                    value={todayStats.autarky}
                    suffix="%"
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <Text type="secondary">+12% durch KI</Text>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ background: '#fff7e6', border: '1px solid #ffd591' }}>
                  <Statistic
                    title="Nächste Optimierung"
                    value="14:30"
                    prefix={<ClockCircleOutlined />}
                  />
                  <Text type="secondary">Wetterprognose</Text>
                </Card>
              </Col>
            </Row>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
              <LineChartOutlined /> Predictive Analytics
            </Title>
            <Timeline>
              {predictions.map((pred, index) => (
                <Timeline.Item key={index} color="green">
                  <Space direction="vertical" size={0}>
                    <Text strong>
                      {pred.type === 'solar' && '☀️ Morgen'} 
                      {pred.type === 'price' && '💰 Strompreis-Peak'} 
                      {pred.type === 'weather' && '🌤️ Wettervorhersage'}
                    </Text>
                    <Text>{pred.tomorrow || pred.peak || pred.forecast}</Text>
                    <Text type="secondary">
                      <ExperimentOutlined /> Empfehlung: {pred.recommendation}
                    </Text>
                  </Space>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        )}

        {/* Alarme und Benachrichtigungen */}
        <Card 
          title={
            <Space>
              <BellOutlined />
              <span>Alarme & Benachrichtigungen</span>
              <Tag>Letzte 24h</Tag>
            </Space>
          }
          style={{ marginBottom: 24 }}
        >
          <List
            dataSource={alarms}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    item.type === 'warning' ? <WarningOutlined style={{ color: '#faad14' }} /> :
                    item.type === 'success' ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                    <BellOutlined style={{ color: '#1890ff' }} />
                  }
                  title={<Space><ClockCircleOutlined /> {item.time}</Space>}
                  description={item.message}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Upgrade-Prompt für Basic/Professional */}
        {userTier !== 'enterprise' && (
          <Alert
            message={
              userTier === 'basic' ? 
                "Upgrade zu Professional für Gerätesteuerung und Automatisierungen!" :
                "Upgrade zu Enterprise für KI-Optimierung und unbegrenzte Features!"
            }
            description={
              <Space>
                <Text>
                  {userTier === 'basic' ? 
                    "Steuern Sie Ihre Geräte, erstellen Sie bis zu 20 Automatisierungen und erhalten Sie erweiterte Analytics." :
                    "Maximale Einsparungen durch KI, predictive Analytics und unbegrenzte Automatisierungen."
                  }
                </Text>
                <Button type="primary" icon={<CrownOutlined />}>
                  Jetzt upgraden
                </Button>
              </Space>
            }
            type="info"
            showIcon
            icon={<CrownOutlined />}
            closable
          />
        )}
      </div>

      {/* Geräte-Steuerung Modal */}
      <Modal
        title={
          <Space>
            {selectedDevice?.icon}
            <span>{selectedDevice?.name} Steuerung</span>
          </Space>
        }
        open={deviceModalVisible}
        onCancel={() => setDeviceModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeviceModalVisible(false)}>
            Abbrechen
          </Button>,
          <Button key="save" type="primary" onClick={() => {
            message.success(`${selectedDevice?.name} Einstellungen gespeichert`)
            setDeviceModalVisible(false)
          }}>
            Speichern
          </Button>
        ]}
      >
        {selectedDevice && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Text strong>Status</Text>
              <Switch 
                checked={selectedDevice.status !== 'off'} 
                checkedChildren="Ein" 
                unCheckedChildren="Aus"
                style={{ marginLeft: 16 }}
              />
            </div>
            <div>
              <Text strong>Modus</Text>
              <Menu mode="horizontal" selectedKeys={[selectedDevice.status]} style={{ marginTop: 8 }}>
                <Menu.Item key="on">Manuell Ein</Menu.Item>
                <Menu.Item key="off">Manuell Aus</Menu.Item>
                <Menu.Item key="auto">Automatisch</Menu.Item>
              </Menu>
            </div>
            <div>
              <Text strong>Leistung: {(selectedDevice.power / 1000).toFixed(1)} kW</Text>
              <Slider 
                min={0} 
                max={11} 
                step={0.1} 
                value={selectedDevice.power / 1000}
                marks={{
                  0: '0 kW',
                  11: '11 kW'
                }}
              />
            </div>
            <Alert
              message="Intelligente Steuerung aktiv"
              description="Das Gerät wird basierend auf Solarüberschuss und Strompreisen automatisch gesteuert."
              type="success"
              showIcon
            />
          </Space>
        )}
      </Modal>
    </div>
  )
} 