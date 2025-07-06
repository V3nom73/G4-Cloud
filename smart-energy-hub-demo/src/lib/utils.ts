import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { UserTier } from "@/types"

// Tailwind CSS class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency in CHF
export function formatCHF(amount: number): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

// Format energy values with units
export function formatEnergy(value: number, unit: 'W' | 'kW' | 'MW' = 'kW', decimals: number = 1): string {
  if (unit === 'kW' && value < 1) {
    return `${Math.round(value * 1000)} W`
  }
  return `${value.toFixed(decimals)} ${unit}`
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`
}

// Calculate savings percentage
export function calculateSavingsPercentage(original: number, current: number): number {
  if (original === 0) return 0
  return ((original - current) / original) * 100
}

// Get tier color
export function getTierColor(tier: UserTier): string {
  const colors = {
    Basic: '#52c41a',
    Professional: '#1890ff',
    Enterprise: '#722ed1'
  }
  return colors[tier] || '#8c8c8c'
}

// Get tier badge color for Ant Design
export function getTierBadgeColor(tier: UserTier): string {
  const colors = {
    Basic: 'green',
    Professional: 'blue',
    Enterprise: 'purple'
  }
  return colors[tier] || 'default'
}

// Check if user has feature access based on tier
export function hasFeature(userTier: UserTier, feature: string): boolean {
  const features: Record<UserTier, string[]> = {
    Basic: ['monitoring', 'alerts', 'basic_history'],
    Professional: ['monitoring', 'alerts', 'basic_history', 'control', 'automation', 'analytics', 'extended_history', 'api_access'],
    Enterprise: ['monitoring', 'alerts', 'basic_history', 'control', 'automation', 'analytics', 'extended_history', 'api_access', 'ai', 'predictions', 'unlimited_history', 'white_label']
  }
  return features[userTier]?.includes(feature) || false
}

// Format date for display
export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString('de-CH')
    case 'long':
      return d.toLocaleDateString('de-CH', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    case 'time':
      return d.toLocaleTimeString('de-CH', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    default:
      return d.toLocaleDateString('de-CH')
  }
}

// Calculate self-consumption rate
export function calculateSelfConsumption(production: number, consumption: number, gridExport: number): number {
  if (production === 0) return 0
  const selfConsumed = Math.min(production, consumption)
  return selfConsumed / production
}

// Calculate autarky rate
export function calculateAutarky(production: number, consumption: number, gridImport: number): number {
  if (consumption === 0) return 0
  const selfSupplied = Math.min(production, consumption)
  return selfSupplied / consumption
}

// Generate mock energy flow data
export function generateMockEnergyFlow() {
  const hour = new Date().getHours()
  const isSunny = hour >= 6 && hour <= 18
  
  return {
    solar: isSunny ? Math.random() * 4 + 1 : 0,
    grid: Math.random() * 0.5,
    house: Math.random() * 2 + 1,
    battery: Math.random() * 1.5,
    wallbox: Math.random() > 0.7 ? 3.7 : 0
  }
}

// Get device status color
export function getDeviceStatusColor(status: string): string {
  const colors = {
    online: '#52c41a',
    offline: '#ff4d4f',
    standby: '#faad14',
    error: '#ff4d4f'
  }
  return colors[status as keyof typeof colors] || '#8c8c8c'
}

// Calculate monthly revenue for a tier
export function calculateMonthlyRevenue(tier: UserTier, customerCount: number): number {
  const prices = {
    Basic: 14.90,
    Professional: 44.90,
    Enterprise: 119.90
  }
  return (prices[tier] || 0) * customerCount
}

// Format time ago
export function formatTimeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  if (seconds < 60) return 'gerade eben'
  if (seconds < 3600) return `vor ${Math.floor(seconds / 60)} Minuten`
  if (seconds < 86400) return `vor ${Math.floor(seconds / 3600)} Stunden`
  if (seconds < 2592000) return `vor ${Math.floor(seconds / 86400)} Tagen`
  return `vor ${Math.floor(seconds / 2592000)} Monaten`
}

// Validate IP address
export function isValidIP(ip: string): boolean {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ip)
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
} 