import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { 
  ApiResponse, 
  PaginatedResponse, 
  User, 
  Customer, 
  Device, 
  EnergyData, 
  AutomationRule,
  Notification 
} from '@/types';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response time in development
    if (process.env.NODE_ENV === 'development' && response.config.metadata) {
      const endTime = new Date();
      const startTime = response.config.metadata.startTime;
      const duration = endTime.getTime() - startTime.getTime();
      console.log(`API ${response.config.method?.toUpperCase()} ${response.config.url}: ${duration}ms`);
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          console.error('Nicht autorisiert - Bitte melden Sie sich erneut an.');
          break;
        
        case 403:
          console.error('Zugriff verweigert - Sie haben keine Berechtigung für diese Aktion.');
          break;
        
        case 404:
          console.error('Nicht gefunden - Die angeforderte Ressource wurde nicht gefunden.');
          break;
        
        case 500:
          console.error('Serverfehler - Ein interner Serverfehler ist aufgetreten.');
          break;
        
        default:
          console.error('Fehler:', (error.response.data as any)?.message || 'Ein unerwarteter Fehler ist aufgetreten.');
      }
    } else if (error.request) {
      // No response received
      console.error('Netzwerkfehler - Keine Verbindung zum Server. Bitte überprüfen Sie Ihre Internetverbindung.');
    } else {
      // Request setup error
      console.error('Fehler - Ein unerwarteter Fehler ist aufgetreten.');
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  logout: () =>
    api.post('/auth/logout'),
  
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/auth/register', userData),
  
  refreshToken: () =>
    api.post('/auth/refresh'),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};

// User endpoints
export const userAPI = {
  getProfile: () =>
    api.get('/user/profile'),
  
  updateProfile: (data: any) =>
    api.put('/user/profile', data),
  
  changeTier: (tier: string) =>
    api.post('/user/change-tier', { tier }),
  
  getUsageStats: () =>
    api.get('/user/usage-stats'),
};

// Device endpoints
export const deviceAPI = {
  getAll: () =>
    api.get('/devices'),
  
  getById: (id: string) =>
    api.get(`/devices/${id}`),
  
  add: (deviceData: any) =>
    api.post('/devices', deviceData),
  
  update: (id: string, data: any) =>
    api.put(`/devices/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/devices/${id}`),
  
  control: (id: string, command: any) =>
    api.post(`/devices/${id}/control`, command),
  
  discover: () =>
    api.get('/devices/discover'),
  
  testConnection: (id: string) =>
    api.post(`/devices/${id}/test`),
};

// Energy data endpoints
export const energyAPI = {
  getCurrentFlow: () =>
    api.get('/energy/current'),
  
  getHistory: (params: { from: string; to: string; interval?: string }) =>
    api.get('/energy/history', { params }),
  
  getStatistics: (period: 'day' | 'week' | 'month' | 'year') =>
    api.get(`/energy/statistics/${period}`),
  
  getPredictions: () =>
    api.get('/energy/predictions'),
  
  getOptimizations: () =>
    api.get('/energy/optimizations'),
};

// Automation endpoints
export const automationAPI = {
  getAll: () =>
    api.get('/automations'),
  
  create: (data: any) =>
    api.post('/automations', data),
  
  update: (id: string, data: any) =>
    api.put(`/automations/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/automations/${id}`),
  
  toggle: (id: string, enabled: boolean) =>
    api.patch(`/automations/${id}/toggle`, { enabled }),
  
  test: (id: string) =>
    api.post(`/automations/${id}/test`),
};

// Admin endpoints
export const adminAPI = {
  getCustomers: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/admin/customers', { params }),
  
  getCustomerById: (id: string) =>
    api.get(`/admin/customers/${id}`),
  
  updateCustomer: (id: string, data: any) =>
    api.put(`/admin/customers/${id}`, data),
  
  getSystemStatus: () =>
    api.get('/admin/system/status'),
  
  getRevenue: (period: 'month' | 'quarter' | 'year') =>
    api.get(`/admin/revenue/${period}`),
  
  getTickets: () =>
    api.get('/admin/tickets'),
  
  updateTicket: (id: string, data: any) =>
    api.put(`/admin/tickets/${id}`, data),
};

// WebSocket connection for real-time updates
export const createWebSocketConnection = (onMessage: (data: any) => void) => {
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log('WebSocket connected');
    ws.send(JSON.stringify({ type: 'auth', token: localStorage.getItem('authToken') }));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
    // Attempt to reconnect after 5 seconds
    setTimeout(() => createWebSocketConnection(onMessage), 5000);
  };

  return ws;
};

// Declare axios request config metadata
declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: {
      startTime: Date
    }
  }
}

export default api; 