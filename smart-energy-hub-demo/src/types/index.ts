// User & Authentication Types
export type UserTier = 'Basic' | 'Professional' | 'Enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  tier?: UserTier;
  since: string;
  location?: string;
}

// Energy Flow Types
export interface EnergyFlow {
  solar: number;
  grid: number;
  house: number;
  battery: number;
  wallbox: number;
  timestamp?: Date;
}

// Device Types
export type DeviceStatus = 'online' | 'offline' | 'standby' | 'error';
export type DeviceType = 'inverter' | 'battery' | 'wallbox' | 'heatpump' | 'smartmeter';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  manufacturer: string;
  model?: string;
  status: DeviceStatus;
  power: number;
  ipAddress?: string;
  apiKey?: string;
  lastSync?: Date;
  charge?: number; // For battery devices
}

// Customer Types (Admin)
export interface Customer extends User {
  tier: UserTier;
  devices: number;
  revenue: number;
  installer?: string;
  subscription: {
    startDate: string;
    nextBilling: string;
    status: 'active' | 'paused' | 'cancelled';
  };
}

// Automation Types
export interface AutomationRule {
  id: string;
  name: string;
  active: boolean;
  condition: AutomationCondition;
  action: AutomationAction;
  savings?: number;
  createdAt: Date;
  lastTriggered?: Date;
}

export interface AutomationCondition {
  type: 'solar_excess' | 'low_price' | 'battery_full' | 'time_based' | 'weather';
  value?: number;
  operator?: 'greater' | 'less' | 'equal';
}

export interface AutomationAction {
  type: 'charge_car' | 'heat_water' | 'start_appliance' | 'charge_battery';
  deviceId?: string;
  value?: number;
}

// Analytics Types
export interface EnergyData {
  timestamp: Date;
  consumption: number;
  production: number;
  gridImport: number;
  gridExport: number;
  batteryCharge: number;
}

export interface CostData {
  period: 'day' | 'week' | 'month' | 'year';
  totalCost: number;
  savedAmount: number;
  selfConsumptionRate: number;
  autarkyRate: number;
}

// AI/Prediction Types
export interface Prediction {
  type: 'solar' | 'consumption' | 'price';
  timestamp: Date;
  value: number;
  confidence: number;
  recommendation?: string;
}

export interface Optimization {
  id: string;
  timestamp: Date;
  type: string;
  description: string;
  savingsAmount: number;
  status: 'pending' | 'active' | 'completed';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Chart Data Types
export interface ChartDataPoint {
  x: string | number | Date;
  y: number;
  category?: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  growth?: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// Hardware Configuration Types
export interface HardwareConfig {
  customerId: string;
  devices: DeviceConfig[];
  syncInterval: number;
  automationEnabled: boolean;
}

export interface DeviceConfig {
  deviceId: string;
  connectionType: 'local' | 'cloud';
  connectionDetails: {
    ipAddress?: string;
    apiEndpoint?: string;
    credentials?: {
      username?: string;
      apiKey?: string;
      clientId?: string;
      clientSecret?: string;
    };
  };
  pollingInterval?: number;
  retryAttempts?: number;
} 