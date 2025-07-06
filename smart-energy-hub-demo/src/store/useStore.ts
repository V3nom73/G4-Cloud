import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { 
  User, 
  Device, 
  EnergyFlow, 
  AutomationRule, 
  Notification,
  UserTier 
} from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

interface EnergyState {
  currentFlow: EnergyFlow;
  isConnected: boolean;
  lastUpdate: Date;
  setEnergyFlow: (flow: EnergyFlow) => void;
  setConnectionStatus: (status: boolean) => void;
}

interface DeviceState {
  devices: Device[];
  selectedDevice: Device | null;
  isLoading: boolean;
  setDevices: (devices: Device[]) => void;
  selectDevice: (device: Device | null) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  setLoading: (loading: boolean) => void;
}

interface AutomationState {
  rules: AutomationRule[];
  activeRulesCount: number;
  setRules: (rules: AutomationRule[]) => void;
  toggleRule: (id: string) => void;
  addRule: (rule: AutomationRule) => void;
  removeRule: (id: string) => void;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  activeMenuKey: string;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setActiveMenuKey: (key: string) => void;
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        logout: () => set({ user: null, isAuthenticated: false })
      }),
      {
        name: 'auth-storage'
      }
    )
  )
);

// Energy Store
export const useEnergyStore = create<EnergyState>()(
  devtools(
    (set) => ({
      currentFlow: {
        solar: 0,
        grid: 0,
        house: 0,
        battery: 0,
        wallbox: 0
      },
      isConnected: false,
      lastUpdate: new Date(),
      setEnergyFlow: (flow) => set({ currentFlow: flow, lastUpdate: new Date() }),
      setConnectionStatus: (status) => set({ isConnected: status })
    })
  )
);

// Device Store
export const useDeviceStore = create<DeviceState>()(
  devtools(
    (set) => ({
      devices: [],
      selectedDevice: null,
      isLoading: false,
      setDevices: (devices) => set({ devices }),
      selectDevice: (device) => set({ selectedDevice: device }),
      updateDevice: (id, updates) => 
        set((state) => ({
          devices: state.devices.map((d) => 
            d.id === id ? { ...d, ...updates } : d
          )
        })),
      setLoading: (loading) => set({ isLoading: loading })
    })
  )
);

// Automation Store
export const useAutomationStore = create<AutomationState>()(
  devtools(
    (set) => ({
      rules: [],
      activeRulesCount: 0,
      setRules: (rules) => 
        set({ 
          rules, 
          activeRulesCount: rules.filter(r => r.active).length 
        }),
      toggleRule: (id) =>
        set((state) => {
          const rules = state.rules.map((r) =>
            r.id === id ? { ...r, active: !r.active } : r
          );
          return {
            rules,
            activeRulesCount: rules.filter(r => r.active).length
          };
        }),
      addRule: (rule) =>
        set((state) => {
          const rules = [...state.rules, rule];
          return {
            rules,
            activeRulesCount: rules.filter(r => r.active).length
          };
        }),
      removeRule: (id) =>
        set((state) => {
          const rules = state.rules.filter((r) => r.id !== id);
          return {
            rules,
            activeRulesCount: rules.filter(r => r.active).length
          };
        })
    })
  )
);

// Notification Store
export const useNotificationStore = create<NotificationState>()(
  devtools(
    persist(
      (set) => ({
        notifications: [],
        unreadCount: 0,
        addNotification: (notification) =>
          set((state) => ({
            notifications: [notification, ...state.notifications],
            unreadCount: state.unreadCount + (notification.read ? 0 : 1)
          })),
        markAsRead: (id) =>
          set((state) => {
            const notifications = state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            );
            return {
              notifications,
              unreadCount: notifications.filter(n => !n.read).length
            };
          }),
        markAllAsRead: () =>
          set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, read: true })),
            unreadCount: 0
          })),
        removeNotification: (id) =>
          set((state) => {
            const notification = state.notifications.find(n => n.id === id);
            const notifications = state.notifications.filter((n) => n.id !== id);
            return {
              notifications,
              unreadCount: state.unreadCount - (notification && !notification.read ? 1 : 0)
            };
          })
      }),
      {
        name: 'notification-storage'
      }
    )
  )
);

// UI Store
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        sidebarCollapsed: false,
        theme: 'light',
        activeMenuKey: 'dashboard',
        toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        setTheme: (theme) => set({ theme }),
        setActiveMenuKey: (key) => set({ activeMenuKey: key })
      }),
      {
        name: 'ui-storage'
      }
    )
  )
);

// Helper hook to check feature access based on user tier
export const useFeatureAccess = () => {
  const user = useAuthStore((state) => state.user);
  
  const hasFeature = (feature: string): boolean => {
    if (!user?.tier) return false;
    
    const features: Record<UserTier, string[]> = {
      Basic: ['monitoring', 'alerts', 'basic_history'],
      Professional: ['monitoring', 'alerts', 'basic_history', 'control', 'automation', 'analytics', 'extended_history', 'api_access'],
      Enterprise: ['monitoring', 'alerts', 'basic_history', 'control', 'automation', 'analytics', 'extended_history', 'api_access', 'ai', 'predictions', 'unlimited_history', 'white_label']
    };
    
    return features[user.tier]?.includes(feature) || false;
  };
  
  return { hasFeature, userTier: user?.tier };
}; 