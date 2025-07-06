'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Zap, 
  Battery, 
  Car, 
  Thermometer, 
  Sun, 
  Globe, 
  LogOut, 
  Bell, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  Brain,
  Clock,
  Crown,
  ArrowUp,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Info,
  DollarSign
} from 'lucide-react';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTier, setCurrentTier] = useState<'Basic' | 'Professional' | 'Enterprise'>('Professional');
  const [energyData, setEnergyData] = useState({
    solar: 2.5,
    house: 1.8,
    battery: 0.7,
    wallbox: 0.0,
    grid: 0.0
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time data updates
    const dataTimer = setInterval(() => {
      setEnergyData(prev => ({
        solar: Math.max(0, prev.solar + (Math.random() - 0.5) * 0.5),
        house: Math.max(0.5, prev.house + (Math.random() - 0.5) * 0.3),
        battery: Math.max(0, Math.min(3, prev.battery + (Math.random() - 0.5) * 0.2)),
        wallbox: Math.random() > 0.7 ? Math.random() * 11 : 0,
        grid: Math.random() > 0.8 ? Math.random() * 2 : 0
      }));
    }, 3000);
    return () => clearInterval(dataTimer);
  }, []);

  const todayStats = [
    { label: 'Erzeugt', value: '18.2 kWh', icon: <Sun className="h-5 w-5 text-yellow-600" /> },
    { label: 'Verbraucht', value: '12.4 kWh', icon: <Home className="h-5 w-5 text-blue-600" /> },
    { label: 'Gespeichert', value: '4.8 kWh', icon: <Battery className="h-5 w-5 text-green-600" /> },
    { label: 'Verkauft', value: '1.0 kWh', icon: <Globe className="h-5 w-5 text-purple-600" /> }
  ];

  const devices = [
    { 
      name: 'Wechselrichter', 
      status: 'Online', 
      power: `${energyData.solar.toFixed(1)} kW`,
      icon: <Sun className="h-6 w-6 text-yellow-600" />,
      controlled: false
    },
    { 
      name: 'Batteriespeicher', 
      status: 'Laden', 
      power: `${energyData.battery.toFixed(1)} kW`,
      icon: <Battery className="h-6 w-6 text-green-600" />,
      controlled: currentTier !== 'Basic'
    },
    { 
      name: 'Wallbox', 
      status: energyData.wallbox > 0 ? 'Lädt' : 'Bereit', 
      power: `${energyData.wallbox.toFixed(1)} kW`,
      icon: <Car className="h-6 w-6 text-blue-600" />,
      controlled: currentTier !== 'Basic'
    },
    { 
      name: 'Wärmepumpe', 
      status: 'Auto', 
      power: '2.1 kW',
      icon: <Thermometer className="h-6 w-6 text-orange-600" />,
      controlled: currentTier !== 'Basic'
    }
  ];

  const automationRules = [
    { name: 'Solarüberschuss → Wallbox', status: 'Aktiv', tier: 'Professional' },
    { name: 'Nachtstrom → Wärmepumpe', status: 'Aktiv', tier: 'Professional' },
    { name: 'Wetterprognose → Batterieladung', status: 'Pausiert', tier: 'Professional' },
    { name: 'KI-Optimierung → Alle Geräte', status: 'Aktiv', tier: 'Enterprise' },
    { name: 'Strompreis-Optimierung', status: 'Aktiv', tier: 'Enterprise' }
  ];

  const alerts = [
    { type: 'warning', message: 'Wechselrichter offline seit 12:34', time: '2h', tier: 'Basic' },
    { type: 'info', message: 'Neue Automatisierung verfügbar', time: '1d', tier: 'Professional' },
    { type: 'success', message: 'KI-Optimierung: 4.80 CHF gespart heute', time: '30min', tier: 'Enterprise' }
  ];

  const tierFeatures = {
    Basic: {
      color: 'green',
      price: '14.90 CHF',
      features: ['Monitoring', 'Alarmierungen', '7 Tage Historie'],
      limits: { rules: 0, history: 7, ai: false }
    },
    Professional: {
      color: 'blue', 
      price: '44.90 CHF',
      features: ['Steuerung', 'Automatisierung', '30 Tage Historie'],
      limits: { rules: 20, history: 30, ai: false }
    },
    Enterprise: {
      color: 'purple',
      price: '119.90 CHF', 
      features: ['KI-Optimierung', 'Unbegrenzte Historie', 'Priority Support'],
      limits: { rules: -1, history: -1, ai: true }
    }
  };

  const renderEnergyFlow = () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Energiefluss Live</h3>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>
      
      {/* Energy Flow Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Solar */}
        <div className="text-center">
          <div className="h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 relative">
            <Sun className="h-10 w-10 text-yellow-600" />
            {energyData.solar > 0 && (
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-600 mb-1">Solar</div>
          <div className="text-2xl font-bold text-gray-900">{energyData.solar.toFixed(1)} kW</div>
          <div className="text-xs text-gray-500">Erzeugung</div>
        </div>

        {/* House */}
        <div className="text-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Home className="h-10 w-10 text-blue-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Haus</div>
          <div className="text-2xl font-bold text-gray-900">{energyData.house.toFixed(1)} kW</div>
          <div className="text-xs text-gray-500">Verbrauch</div>
        </div>

        {/* Battery */}
        <div className="text-center">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 relative">
            <Battery className="h-10 w-10 text-green-600" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
              <div className={`text-xs px-2 py-1 rounded-full ${
                energyData.battery > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {energyData.battery > 0 ? 'Lädt' : 'Bereit'}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-1">Speicher</div>
          <div className="text-2xl font-bold text-gray-900">{energyData.battery.toFixed(1)} kW</div>
          <div className="text-xs text-gray-500">Ladung</div>
        </div>
      </div>

      {/* Energy Balance */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Energiebilanz</h4>
            <p className="text-sm text-gray-600">
              {energyData.grid > 0 ? `Bezug: ${energyData.grid.toFixed(1)} kW` : 'Vollständig autark'}
            </p>
          </div>
          <div className="flex items-center">
            {energyData.grid === 0 ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <ArrowUp className="h-6 w-6 text-blue-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeviceControl = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <Zap className="h-5 w-5 text-green-600 mr-2" />
        Geräte-Steuerung
        {currentTier === 'Basic' && (
          <span className="ml-2 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
            Nur Monitoring
          </span>
        )}
      </h3>
      
      <div className="grid gap-4">
        {devices.map((device, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center">
                {device.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{device.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{device.status}</span>
                  <span className="text-sm font-medium text-gray-900">{device.power}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {device.controlled ? (
                <>
                  <Button size="sm" variant="outline">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Pause className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-xs text-gray-500">
                  {currentTier === 'Basic' ? 'Upgrade für Steuerung' : 'Nur Monitor'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <RotateCcw className="h-5 w-5 text-blue-600 mr-2" />
          Automatisierung
          {currentTier !== 'Basic' && (
            <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
              {automationRules.filter(r => (currentTier === 'Professional' && r.tier !== 'Enterprise') || currentTier === 'Enterprise').length} / {tierFeatures[currentTier].limits.rules === -1 ? '∞' : tierFeatures[currentTier].limits.rules}
            </span>
          )}
        </h3>
        {currentTier !== 'Basic' && (
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Settings className="h-4 w-4 mr-1" />
            Regeln
          </Button>
        )}
      </div>

      {currentTier === 'Basic' ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <RotateCcw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-medium text-gray-900 mb-2">Automatisierung nicht verfügbar</h4>
          <p className="text-gray-600 mb-4">Upgraden Sie auf Professional für intelligente Automatisierung</p>
          <Button onClick={() => setCurrentTier('Professional')} className="bg-blue-600 hover:bg-blue-700">
            Upgrade zu Professional
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {automationRules
            .filter(rule => (currentTier === 'Professional' && rule.tier !== 'Enterprise') || currentTier === 'Enterprise')
            .map((rule, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`h-2 w-2 rounded-full ${
                  rule.status === 'Aktiv' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <span className="font-medium text-gray-900">{rule.name}</span>
                {rule.tier === 'Enterprise' && currentTier === 'Enterprise' && (
                  <Crown className="h-4 w-4 text-purple-600" />
                )}
              </div>
              <span className={`text-sm ${
                rule.status === 'Aktiv' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {rule.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderKIOptimization = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <Brain className="h-5 w-5 text-purple-600 mr-2" />
        KI-Optimierung
        {currentTier === 'Enterprise' && (
          <span className="ml-2 bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
            Aktiv
          </span>
        )}
      </h3>

      {currentTier !== 'Enterprise' ? (
        <div className="text-center py-8 border-2 border-dashed border-purple-300 rounded-lg">
          <Brain className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h4 className="font-medium text-gray-900 mb-2">KI-Optimierung nicht verfügbar</h4>
          <p className="text-gray-600 mb-4">Upgraden Sie auf Enterprise für intelligente KI-Optimierung</p>
          <Button onClick={() => setCurrentTier('Enterprise')} className="bg-purple-600 hover:bg-purple-700">
            Upgrade zu Enterprise
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 mb-1">Einsparung heute</div>
              <div className="text-2xl font-bold text-green-700">4.80 CHF</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">Monatlich</div>
              <div className="text-2xl font-bold text-blue-700">131 CHF</div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Brain className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-900">Nächste Optimierung</span>
            </div>
            <p className="text-sm text-purple-700">14:30 - Wetterprognose-basierte Batterieladung</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Autarkiegrad</span>
              <span className="font-medium text-gray-900">89% (+12% durch KI)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '89%'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTierInfo = () => (
    <div className={`bg-gradient-to-r from-${tierFeatures[currentTier].color}-50 to-${tierFeatures[currentTier].color}-100 rounded-xl p-6 shadow-lg border border-${tierFeatures[currentTier].color}-200`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Aktueller Plan: {currentTier}</h3>
          <p className="text-sm text-gray-600">{tierFeatures[currentTier].price}/Monat</p>
        </div>
        <Crown className={`h-8 w-8 text-${tierFeatures[currentTier].color}-600`} />
      </div>
      
      <div className="space-y-2 mb-4">
        {tierFeatures[currentTier].features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      {currentTier !== 'Enterprise' && (
        <Button 
          onClick={() => setCurrentTier(currentTier === 'Basic' ? 'Professional' : 'Enterprise')}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
        >
          Upgrade zu {currentTier === 'Basic' ? 'Professional' : 'Enterprise'}
          <ArrowUp className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {renderEnergyFlow()}
          {renderDeviceControl()}
        </div>
        
        <div className="space-y-6">
          {renderTierInfo()}
          {renderAutomation()}
          {renderKIOptimization()}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Bell className="h-5 w-5 text-orange-600 mr-2" />
          Benachrichtigungen
        </h3>
        <div className="space-y-3">
          {alerts
            .filter(alert => 
              alert.tier === 'Basic' || 
              (alert.tier === 'Professional' && currentTier !== 'Basic') ||
              (alert.tier === 'Enterprise' && currentTier === 'Enterprise')
            )
            .map((alert, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              {alert.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
              {alert.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
              {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
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
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Smart Energy Hub</h1>
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleDateString('de-CH')} - {currentTime.toLocaleTimeString('de-CH')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Tier:</span>
              <select 
                value={currentTier} 
                onChange={(e) => setCurrentTier(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
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

      {/* Main Content */}
      <main className="p-8">
        {renderDashboard()}
      </main>
    </div>
  );
} 