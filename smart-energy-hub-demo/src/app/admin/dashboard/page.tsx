'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Users, 
  BarChart3, 
  Zap, 
  LogOut, 
  Bell, 
  Search, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  Wifi,
  WifiOff,
  Wrench,
  Eye,
  Edit,
  ChevronRight,
  DollarSign,
  Activity,
  Server,
  Shield,
  Database,
  Cpu
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const platformStats = [
    { label: 'Aktive Kunden', value: '1,247', change: '+12%', icon: <Users className="h-6 w-6 text-blue-600" />, trend: 'up' },
    { label: 'Revenue (Monat)', value: '42,680 CHF', change: '+18%', icon: <DollarSign className="h-6 w-6 text-green-600" />, trend: 'up' },
    { label: 'Verbundene Geräte', value: '4,891', change: '+25%', icon: <Zap className="h-6 w-6 text-purple-600" />, trend: 'up' },
    { label: 'System Uptime', value: '99.9%', change: 'SLA erfüllt', icon: <Server className="h-6 w-6 text-orange-600" />, trend: 'stable' },
  ];

  const recentCustomers = [
    {
      id: '1',
      name: 'Max Mustermann',
      tier: 'Professional',
      status: 'Aktiv',
      since: '2024-01-15',
      revenue: '44.90 CHF/Monat',
      devices: 5,
      lastSync: '2 min'
    },
    {
      id: '2',
      name: 'Anna Schmidt',
      tier: 'Enterprise',
      status: 'Aktiv',
      since: '2024-02-01',
      revenue: '119.90 CHF/Monat',
      devices: 8,
      lastSync: '1 min'
    },
    {
      id: '3',
      name: 'Peter Weber',
      tier: 'Basic',
      status: 'Setup',
      since: '2024-03-10',
      revenue: '14.90 CHF/Monat',
      devices: 2,
      lastSync: '15 min'
    }
  ];

  const systemStatus = [
    { service: 'API Gateway', status: 'online', response: '45ms' },
    { service: 'Database', status: 'online', response: '12ms' },
    { service: 'KI Engine', status: 'online', response: '234ms' },
    { service: 'Device Sync', status: 'warning', response: '1.2s' },
    { service: 'Billing System', status: 'online', response: '89ms' }
  ];

  const supportTickets = [
    { id: '#1247', title: 'Wallbox Verbindung unterbrochen', priority: 'Hoch', customer: 'M. Mustermann', time: '2h' },
    { id: '#1248', title: 'KI-Optimierung Frage', priority: 'Mittel', customer: 'A. Schmidt', time: '4h' },
    { id: '#1249', title: 'Neue Geräte hinzufügen', priority: 'Niedrig', customer: 'P. Weber', time: '1d' }
  ];

  const deviceAdapters = [
    { name: 'Fronius Symo', type: 'Wechselrichter', status: 'Aktiv', connections: 342 },
    { name: 'Tesla Powerwall', type: 'Batteriespeicher', status: 'Aktiv', connections: 156 },
    { name: 'go-eCharger', type: 'Wallbox', status: 'Aktiv', connections: 289 },
    { name: 'Viessmann Vitocal', type: 'Wärmepumpe', status: 'Wartung', connections: 78 },
    { name: 'SMA Sunny Boy', type: 'Wechselrichter', status: 'Aktiv', connections: 234 }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600 mr-1" />}
                  {stat.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600 mr-1" />}
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 text-green-600 mr-2" />
            System-Status
          </h3>
          <div className="space-y-3">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-3 ${
                    service.status === 'online' ? 'bg-green-500' : 
                    service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{service.service}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{service.response}</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 text-orange-600 mr-2" />
            Support Tickets
            <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">12 offen</span>
          </h3>
          <div className="space-y-3">
            {supportTickets.map((ticket, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{ticket.id}</div>
                  <div className="text-sm text-gray-600">{ticket.title}</div>
                  <div className="text-xs text-gray-500">{ticket.customer}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    ticket.priority === 'Hoch' ? 'bg-red-100 text-red-600' :
                    ticket.priority === 'Mittel' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {ticket.priority}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{ticket.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Kunden-Management</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Neuer Kunde
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Kunde suchen..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Alle Tiers</option>
              <option>Basic</option>
              <option>Professional</option>
              <option>Enterprise</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentCustomers.map((customer) => (
            <div key={customer.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{customer.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.tier === 'Enterprise' ? 'bg-purple-100 text-purple-600' :
                        customer.tier === 'Professional' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {customer.tier}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.status === 'Aktiv' ? 'bg-green-100 text-green-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Seit: {customer.since} | Revenue: {customer.revenue}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {customer.devices} Geräte | Sync: {customer.lastSync}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Wrench className="h-4 w-4 mr-1" />
                    Konfiguration
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Device-Adapter</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Neuer Adapter
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {deviceAdapters.map((adapter, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  adapter.status === 'Aktiv' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <Zap className={`h-5 w-5 ${
                    adapter.status === 'Aktiv' ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{adapter.name}</h3>
                  <p className="text-sm text-gray-600">{adapter.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {adapter.status === 'Aktiv' ? (
                  <Wifi className="h-5 w-5 text-green-600" />
                ) : (
                  <WifiOff className="h-5 w-5 text-yellow-600" />
                )}
                <span className={`text-sm ${
                  adapter.status === 'Aktiv' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {adapter.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktive Verbindungen</p>
                <p className="text-2xl font-bold text-gray-900">{adapter.connections}</p>
              </div>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-1" />
                Bearbeiten
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Smart Energy Hub - Admin</h1>
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleDateString('de-CH')} - {currentTime.toLocaleTimeString('de-CH')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              12 Notifications
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/login'}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-80px)]">
          <nav className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'overview' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                Übersicht
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'customers' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                Kunden
              </button>
              <button
                onClick={() => setActiveTab('devices')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'devices' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Zap className="h-5 w-5 mr-3" />
                Geräte-Adapter
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'system' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Server className="h-5 w-5 mr-3" />
                System
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'devices' && renderDevices()}
          {activeTab === 'system' && (
            <div className="text-center py-20">
              <Server className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">System-Verwaltung</h3>
              <p className="text-gray-600">Erweiterte System-Konfiguration und Maintenance-Tools</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 