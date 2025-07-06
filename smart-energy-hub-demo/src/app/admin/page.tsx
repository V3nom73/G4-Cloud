'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Card, 
  Button, 
  Table, 
  Space, 
  Typography, 
  Tag, 
  Row, 
  Col, 
  Statistic, 
  Input,
  Select,
  Modal,
  Form,
  Tabs,
  App,
  Badge,
  Progress,
  Alert,
  List,
  Avatar,
  Dropdown,
  Menu,
  Timeline,
  Descriptions,
  Switch,
  Divider,
  Tooltip,
  notification
} from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  ThunderboltOutlined,
  ThunderboltFilled,
  ApiOutlined,
  CloudOutlined,
  WifiOutlined,
  DatabaseOutlined,
  RobotOutlined,
  ToolOutlined,
  BellOutlined,
  LineChartOutlined,
  TeamOutlined,
  CrownOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  GlobalOutlined,
  HomeOutlined,
  CarOutlined,
  FireOutlined,
  RiseOutlined
} from '@ant-design/icons'
import { Area, Column, Pie } from '@ant-design/charts'
import { useAuth } from '@/hooks/useAuth'

const { Title, Text, Paragraph } = Typography
const { Search } = Input

// Mock-Daten für Plattform-Statistiken
const platformStats = {
  totalCustomers: 1247,
  customersGrowth: 12,
  monthlyRevenue: 42680,
  revenueGrowth: 18,
  totalDevices: 4891,
  devicesGrowth: 25,
  systemUptime: 99.9
}

// Mock-Daten für Kunden
const mockCustomers = [
  {
    id: 1,
    name: 'Max Mustermann',
    email: 'max@example.com',
    tier: 'professional',
    status: 'active',
    joinDate: '2024-01-15',
    monthlyFee: 44.90,
    address: 'Musterstraße 123, 8001 Zürich',
    installer: 'SolarMax GmbH',
    devices: {
      inverter: { status: 'online', model: 'Fronius Symo 10.0-3-M' },
      battery: { status: 'offline', model: 'Tesla Powerwall 2' },
      wallbox: { status: 'not_configured', model: null },
      heatpump: { status: 'online', model: 'Viessmann Vitocal' }
    }
  },
  {
    id: 2,
    name: 'Anna Schmidt',
    email: 'anna@example.com',
    tier: 'enterprise',
    status: 'active',
    joinDate: '2023-11-20',
    monthlyFee: 119.90,
    address: 'Bahnhofstrasse 45, 3011 Bern',
    installer: 'EnergiePlus AG',
    devices: {
      inverter: { status: 'online', model: 'SMA Sunny Tripower' },
      battery: { status: 'online', model: 'BYD Battery-Box' },
      wallbox: { status: 'online', model: 'go-eCharger' },
      heatpump: { status: 'online', model: 'Daikin Altherma' }
    }
  },
  {
    id: 3,
    name: 'Thomas Weber',
    email: 'thomas@example.com',
    tier: 'basic',
    status: 'active',
    joinDate: '2024-02-01',
    monthlyFee: 14.90,
    address: 'Seestrasse 78, 6004 Luzern',
    installer: 'Green Energy Solutions',
    devices: {
      inverter: { status: 'online', model: 'SolarEdge HD-Wave' },
      battery: { status: 'not_configured', model: null },
      wallbox: { status: 'not_configured', model: null },
      heatpump: { status: 'not_configured', model: null }
    }
  }
]

// Mock-Daten für Support-Tickets
const supportTickets = [
  { id: 1, customer: 'Max Mustermann', issue: 'Batteriespeicher offline', priority: 'high', status: 'open' },
  { id: 2, customer: 'Anna Schmidt', issue: 'Optimierung funktioniert nicht', priority: 'medium', status: 'open' },
  { id: 3, customer: 'Thomas Weber', issue: 'Login-Probleme', priority: 'low', status: 'resolved' }
]

// Mock-Daten für System-Status
const systemStatus = {
  apiGateway: { status: 'online', latency: 23 },
  database: { status: 'online', latency: 5 },
  aiService: { status: 'online', latency: 145 },
  deviceAdapters: {
    total: 25,
    active: 23,
    maintenance: 2
  }
}

// Icon für unbekanntes Gerät
const QuestionCircleOutlined = () => <span>❓</span>

// Mock-Daten für gefundene Geräte
const discoveredDevices = [
  { ip: '192.168.1.100', type: 'Fronius Symo', status: 'configured', icon: <ThunderboltOutlined /> },
  { ip: '192.168.1.200', type: 'go-eCharger', status: 'new', icon: <CarOutlined /> },
  { ip: '192.168.1.150', type: 'Shelly 3EM', status: 'new', icon: <HomeOutlined /> },
  { ip: '192.168.1.250', type: 'Unbekanntes Gerät', status: 'unknown', icon: <QuestionCircleOutlined /> }
]

export default function AdminPage() {
  const router = useRouter()
  const { logout } = useAuth()
  const { message } = App.useApp()
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [configModalVisible, setConfigModalVisible] = useState(false)
  const [discoveryModalVisible, setDiscoveryModalVisible] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanning, setScanning] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Einstellungen
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Abmelden
      </Menu.Item>
    </Menu>
  )

  const handleCustomerConfig = (customer: any) => {
    setSelectedCustomer(customer)
    setConfigModalVisible(true)
  }

  const handleDeviceDiscovery = () => {
    setDiscoveryModalVisible(true)
    startNetworkScan()
  }

  const startNetworkScan = () => {
    setScanning(true)
    setScanProgress(0)
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanning(false)
          message.success('Netzwerk-Scan abgeschlossen! 4 Geräte gefunden.')
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Chart-Konfiguration für Revenue
  const revenueChartData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'][i],
    revenue: 30000 + Math.random() * 15000
  }))

  // Tier-Verteilung für Pie Chart
  const tierDistribution = [
    { type: 'Basic', value: 523, color: '#8c8c8c' },
    { type: 'Professional', value: 612, color: '#1890ff' },
    { type: 'Enterprise', value: 112, color: '#faad14' }
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Tier',
      dataIndex: 'tier',
      key: 'tier',
      render: (tier: string) => (
        <Tag color={tier === 'enterprise' ? 'gold' : tier === 'professional' ? 'blue' : 'default'}>
          {tier === 'enterprise' && <CrownOutlined />}
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={status === 'active' ? 'success' : 'default'} text={status === 'active' ? 'Aktiv' : 'Inaktiv'} />
      )
    },
    {
      title: 'Monatsbeitrag',
      dataIndex: 'monthlyFee',
      key: 'monthlyFee',
      render: (fee: number) => <Text strong>CHF {fee.toFixed(2)}</Text>
    },
    {
      title: 'Geräte-Status',
      key: 'deviceStatus',
      render: (_: any, record: any) => {
        const devices = record.devices
        const onlineCount = Object.values(devices).filter((d: any) => d.status === 'online').length
        const totalConfigured = Object.values(devices).filter((d: any) => d.status !== 'not_configured').length
        
        return (
          <Space>
            <Tag color={onlineCount === totalConfigured && totalConfigured > 0 ? 'green' : 'orange'}>
              {onlineCount}/{totalConfigured} Online
            </Tag>
            {devices.battery?.status === 'offline' && <WarningOutlined style={{ color: '#faad14' }} />}
          </Space>
        )
      }
    },
    {
      title: 'Aktionen',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Tier ändern">
            <Button icon={<CrownOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Support">
            <Button icon={<CustomerServiceOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Konfiguration">
            <Button 
              icon={<SettingOutlined />} 
              size="small" 
              type="primary"
              onClick={() => handleCustomerConfig(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ]

  // CustomerServiceOutlined als Ersatz
  const CustomerServiceOutlined = () => <span>🎧</span>

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
              <SettingOutlined /> Smart Energy Hub - Admin
            </Title>
          </Col>
          <Col>
            <Space>
              <Badge count={5} size="small">
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
        {/* Platform Übersicht */}
        <Title level={5}>📈 Platform Übersicht</Title>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Kunden"
                value={platformStats.totalCustomers}
                precision={0}
                valueStyle={{ color: '#52c41a' }}
                prefix={<TeamOutlined />}
                suffix={
                  <Text type="success" style={{ fontSize: 14 }}>
                    <RiseOutlined /> +{platformStats.customersGrowth}%
                  </Text>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Monatsumsatz"
                value={platformStats.monthlyRevenue}
                precision={2}
                valueStyle={{ color: '#52c41a' }}
                prefix="CHF"
                suffix={
                  <Text type="success" style={{ fontSize: 14 }}>
                    <RiseOutlined /> +{platformStats.revenueGrowth}%
                  </Text>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Geräte"
                value={platformStats.totalDevices}
                precision={0}
                valueStyle={{ color: '#1890ff' }}
                prefix={<ApiOutlined />}
                suffix={
                  <Text type="success" style={{ fontSize: 14 }}>
                    <RiseOutlined /> +{platformStats.devicesGrowth}%
                  </Text>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="System Uptime"
                value={platformStats.systemUptime}
                precision={1}
                valueStyle={{ color: '#52c41a' }}
                suffix="%"
                prefix={<CheckCircleOutlined />}
              />
              <Text type="secondary">SLA: 99.5%</Text>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          {/* Umsatz-Chart */}
          <Col xs={24} lg={16}>
            <Card title="Monatsumsatz (CHF)">
              <Area
                data={revenueChartData}
                xField="month"
                yField="revenue"
                color="#52c41a"
                areaStyle={{ fillOpacity: 0.7 }}
                height={200}
              />
            </Card>
          </Col>

          {/* Tier-Verteilung */}
          <Col xs={24} lg={8}>
            <Card title="Kunden-Verteilung nach Tier">
              <Pie
                data={tierDistribution}
                angleField="value"
                colorField="type"
                radius={0.8}
                label={{
                  type: 'outer',
                  content: '{name} {percentage}'
                }}
                height={200}
              />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="customers">
          {/* Kunden-Management Tab */}
          <Tabs.TabPane tab={<span><TeamOutlined /> Kunden-Management</span>} key="customers">
            <Card>
              <Space style={{ marginBottom: 16 }}>
                <Search 
                  placeholder="Kunde suchen..." 
                  style={{ width: 300 }} 
                  prefix={<SearchOutlined />}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  Neuer Kunde
                </Button>
                <Button icon={<ReloadOutlined />}>
                  Aktualisieren
                </Button>
                <Button icon={<WifiOutlined />} onClick={handleDeviceDiscovery}>
                  Auto-Discovery
                </Button>
              </Space>

              <Table
                columns={columns}
                dataSource={mockCustomers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Tabs.TabPane>

          {/* System-Status Tab */}
          <Tabs.TabPane tab={<span><DatabaseOutlined /> System-Status</span>} key="system">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Service Status">
                  <List>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />}
                        title="API Gateway"
                        description={`Status: Online | Latenz: ${systemStatus.apiGateway.latency}ms`}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />}
                        title="Database"
                        description={`Status: Online | Latenz: ${systemStatus.database.latency}ms`}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />}
                        title="KI Service"
                        description={`Status: Online | Latenz: ${systemStatus.aiService.latency}ms`}
                      />
                    </List.Item>
                  </List>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Device Adapter Status">
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                      <Text>Gesamt: {systemStatus.deviceAdapters.total}</Text>
                      <Progress 
                        percent={(systemStatus.deviceAdapters.active / systemStatus.deviceAdapters.total) * 100} 
                        status="active"
                        strokeColor="#52c41a"
                      />
                    </div>
                    <Space>
                      <Tag color="green">
                        <CheckCircleOutlined /> {systemStatus.deviceAdapters.active} Aktiv
                      </Tag>
                      <Tag color="orange">
                        <ToolOutlined /> {systemStatus.deviceAdapters.maintenance} Wartung
                      </Tag>
                    </Space>
                    <Alert
                      message="2 Adapter in Wartung"
                      description="Fronius Gen24 und Huawei SUN2000 Adapter werden aktualisiert"
                      type="warning"
                      showIcon
                    />
                  </Space>
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>

          {/* Support-Tickets Tab */}
          <Tabs.TabPane 
            tab={
              <Badge count={supportTickets.filter(t => t.status === 'open').length} size="small">
                <span><CustomerServiceOutlined /> Support-Tickets</span>
              </Badge>
            } 
            key="support"
          >
            <Card>
              <List
                dataSource={supportTickets}
                renderItem={ticket => (
                  <List.Item
                    actions={[
                      <Button size="small" type={ticket.status === 'open' ? 'primary' : 'default'}>
                        {ticket.status === 'open' ? 'Bearbeiten' : 'Details'}
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        ticket.priority === 'high' ? 
                          <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: 24 }} /> :
                        ticket.priority === 'medium' ?
                          <WarningOutlined style={{ color: '#faad14', fontSize: 24 }} /> :
                          <InfoCircleOutlined style={{ color: '#1890ff', fontSize: 24 }} />
                      }
                      title={<Space>#{ticket.id} - {ticket.customer}</Space>}
                      description={
                        <Space direction="vertical" size={0}>
                          <Text>{ticket.issue}</Text>
                          <Space>
                            <Tag color={ticket.priority === 'high' ? 'red' : ticket.priority === 'medium' ? 'orange' : 'blue'}>
                              {ticket.priority === 'high' ? 'Hoch' : ticket.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                            </Tag>
                            <Tag color={ticket.status === 'open' ? 'processing' : 'success'}>
                              {ticket.status === 'open' ? 'Offen' : 'Gelöst'}
                            </Tag>
                          </Space>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </div>

      {/* Kunden-Konfigurations-Modal */}
      <Modal
        title={
          <Space>
            <SettingOutlined />
            <span>Konfiguration: {selectedCustomer?.name}</span>
          </Space>
        }
        open={configModalVisible}
        onCancel={() => setConfigModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setConfigModalVisible(false)}>
            Schließen
          </Button>,
          <Button key="save" type="primary" onClick={() => {
            message.success('Konfiguration gespeichert')
            setConfigModalVisible(false)
          }}>
            Speichern
          </Button>
        ]}
      >
        {selectedCustomer && (
          <Tabs defaultActiveKey="info">
            <Tabs.TabPane tab="Kunden-Info" key="info">
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Name">{selectedCustomer.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{selectedCustomer.email}</Descriptions.Item>
                <Descriptions.Item label="Tier">
                  <Tag color={selectedCustomer.tier === 'enterprise' ? 'gold' : 
                              selectedCustomer.tier === 'professional' ? 'blue' : 'default'}>
                    {selectedCustomer.tier.charAt(0).toUpperCase() + selectedCustomer.tier.slice(1)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Monatsbeitrag">CHF {selectedCustomer.monthlyFee}</Descriptions.Item>
                <Descriptions.Item label="Adresse" span={2}>{selectedCustomer.address}</Descriptions.Item>
                <Descriptions.Item label="Installateur">{selectedCustomer.installer}</Descriptions.Item>
                <Descriptions.Item label="Setup-Datum">{selectedCustomer.joinDate}</Descriptions.Item>
              </Descriptions>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Hardware-Konfiguration" key="hardware">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Wechselrichter */}
                <Card 
                  title={<Space><ThunderboltOutlined /> Wechselrichter</Space>}
                  extra={
                    selectedCustomer.devices.inverter.status === 'online' ?
                    <Tag color="green">Online</Tag> :
                    <Tag color="red">Offline</Tag>
                  }
                >
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label="Modell">{selectedCustomer.devices.inverter.model || 'Nicht konfiguriert'}</Descriptions.Item>
                    <Descriptions.Item label="IP-Adresse">192.168.1.100</Descriptions.Item>
                    <Descriptions.Item label="API-Key">
                      <Space>
                        <Text code>****-****-****-1234</Text>
                        <Button size="small">Ändern</Button>
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Letzte Synchronisation">vor 2 Minuten</Descriptions.Item>
                  </Descriptions>
                  <Space style={{ marginTop: 16 }}>
                    <Button type="primary" size="small" icon={<SyncOutlined />}>Testen</Button>
                    <Button size="small">Neu konfigurieren</Button>
                    <Button size="small">Logs anzeigen</Button>
                  </Space>
                </Card>

                {/* Batteriespeicher */}
                <Card 
                  title={<Space><ThunderboltFilled /> Batteriespeicher</Space>}
                  extra={
                    selectedCustomer.devices.battery.status === 'online' ?
                    <Tag color="green">Online</Tag> :
                    selectedCustomer.devices.battery.status === 'offline' ?
                    <Tag color="red">Offline</Tag> :
                    <Tag>Nicht konfiguriert</Tag>
                  }
                >
                  {selectedCustomer.devices.battery.status === 'offline' && (
                    <Alert
                      message="Verbindungsfehler"
                      description="Tesla Gateway API antwortet nicht. Credentials überprüfen."
                      type="error"
                      showIcon
                      style={{ marginBottom: 16 }}
                    />
                  )}
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label="Modell">{selectedCustomer.devices.battery.model || 'Nicht konfiguriert'}</Descriptions.Item>
                    <Descriptions.Item label="Cloud-API">Tesla Gateway</Descriptions.Item>
                    <Descriptions.Item label="Credentials">
                      <Space>
                        <Tag color="red">Fehlerhaft</Tag>
                        <Button size="small" type="primary">Erneuern</Button>
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Letzte Synchronisation">vor 2 Stunden</Descriptions.Item>
                  </Descriptions>
                  <Space style={{ marginTop: 16 }}>
                    <Button size="small" icon={<ToolOutlined />}>Diagnostik</Button>
                    <Button size="small">OAuth erneuern</Button>
                  </Space>
                </Card>

                {/* Wallbox */}
                <Card 
                  title={<Space><CarOutlined /> Wallbox</Space>}
                  extra={
                    selectedCustomer.devices.wallbox.status === 'online' ?
                    <Tag color="green">Online</Tag> :
                    <Tag>Nicht konfiguriert</Tag>
                  }
                >
                  {selectedCustomer.devices.wallbox.status === 'not_configured' ? (
                    <Alert
                      message="Noch nicht konfiguriert"
                      description="Nutzen Sie die Auto-Discovery Funktion oder fügen Sie das Gerät manuell hinzu."
                      type="info"
                      showIcon
                      action={
                        <Space>
                          <Button size="small" type="primary">Gerät hinzufügen</Button>
                          <Button size="small">Auto-Discovery</Button>
                        </Space>
                      }
                    />
                  ) : (
                    <Descriptions column={2} size="small">
                      <Descriptions.Item label="Modell">{selectedCustomer.devices.wallbox.model}</Descriptions.Item>
                      <Descriptions.Item label="Protokoll">OCPP 1.6</Descriptions.Item>
                    </Descriptions>
                  )}
                </Card>
              </Space>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Sync & Automatisierung" key="sync">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title="Synchronisierungs-Einstellungen">
                  <Form layout="vertical">
                    <Form.Item label="Sync-Intervall">
                      <Select defaultValue="30">
                        <Select.Option value="10">10 Sekunden</Select.Option>
                        <Select.Option value="30">30 Sekunden</Select.Option>
                        <Select.Option value="60">1 Minute</Select.Option>
                        <Select.Option value="300">5 Minuten</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Fehler-Wiederholung">
                      <Switch defaultChecked /> Automatische Wiederholung bei Fehlern
                    </Form.Item>
                  </Form>
                </Card>

                <Card title="Automatisierung">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Alert
                      message="3 von 20 Regeln aktiv"
                      description={`Tier: ${selectedCustomer.tier === 'enterprise' ? 'Unbegrenzt' : '20 Regeln maximal'}`}
                      type="info"
                    />
                    <Button type="primary">Regeln bearbeiten</Button>
                    <Button>Sync jetzt ausführen</Button>
                  </Space>
                </Card>
              </Space>
            </Tabs.TabPane>
          </Tabs>
        )}
      </Modal>

      {/* Device-Discovery Modal */}
      <Modal
        title={
          <Space>
            <WifiOutlined />
            <span>Automatische Geräteerkennung</span>
          </Space>
        }
        open={discoveryModalVisible}
        onCancel={() => setDiscoveryModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setDiscoveryModalVisible(false)}>
            Schließen
          </Button>,
          <Button key="rescan" icon={<ReloadOutlined />} onClick={startNetworkScan} disabled={scanning}>
            Erneut scannen
          </Button>,
          <Button key="configure" type="primary">
            Geräte konfigurieren
          </Button>
        ]}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Netzwerk-Scan läuft... (192.168.1.0/24)</Text>
              <Progress percent={scanProgress} status={scanning ? 'active' : 'success'} />
            </Space>
          </Card>

          <Card title="Gefundene Geräte">
            <List
              dataSource={discoveredDevices}
              renderItem={device => (
                <List.Item
                  actions={[
                    device.status === 'configured' ? 
                      <Tag color="green">Bereits konfiguriert</Tag> :
                    device.status === 'new' ?
                      <Space>
                        <Button size="small" type="primary">Konfigurieren</Button>
                        <Button size="small">Details</Button>
                      </Space> :
                      <Button size="small">Manuell hinzufügen</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={device.icon} style={{ backgroundColor: '#52c41a' }} />}
                    title={device.type}
                    description={`IP: ${device.ip}`}
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card title="Cloud-API Konfiguration">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="Cloud-Services für erweiterte Funktionen"
                description="Konfigurieren Sie Cloud-APIs für Geräte ohne lokale Schnittstelle"
                type="info"
                showIcon
              />
              <List size="small">
                <List.Item extra={<Button size="small">Credentials eingeben</Button>}>
                  Tesla Energy API
                </List.Item>
                <List.Item extra={<Button size="small">API-Key eingeben</Button>}>
                  SolarEdge Monitoring
                </List.Item>
                <List.Item extra={<Button size="small">OAuth autorisieren</Button>}>
                  Viessmann ViCare
                </List.Item>
              </List>
            </Space>
          </Card>
        </Space>
      </Modal>
    </div>
  )
}

// InfoCircle als Ersatz
const InfoCircleOutlined = () => <span>ℹ️</span> 