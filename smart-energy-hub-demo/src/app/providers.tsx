'use client'

import { ConfigProvider, App } from 'antd'
import { AuthProvider } from '@/hooks/useAuth'
import { ReactNode } from 'react'
import deDE from 'antd/locale/de_DE'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      locale={deDE}
      theme={{
        token: {
          colorPrimary: '#52c41a',
          borderRadius: 8,
        },
      }}
      // Unterdrücke React 19 Warnung
      warning={{ strict: false }}
    >
      <App>
        <AuthProvider>
          {children}
        </AuthProvider>
      </App>
    </ConfigProvider>
  )
} 