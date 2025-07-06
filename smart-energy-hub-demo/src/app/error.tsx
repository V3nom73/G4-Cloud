'use client'

import { useEffect } from 'react'
import { Button, Result } from 'antd'
import { CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f5f5f5'
    }}>
      <Result
        status="error"
        title="Ups! Es ist ein Fehler aufgetreten"
        subTitle="Entschuldigung, es gab ein Problem beim Laden dieser Seite. Bitte versuchen Sie es erneut."
        extra={[
          <Button 
            type="primary" 
            key="retry" 
            icon={<ReloadOutlined />}
            size="large"
            onClick={reset}
          >
            Erneut versuchen
          </Button>,
          <Button 
            key="home" 
            size="large"
            href="/"
          >
            Zur Startseite
          </Button>
        ]}
      >
        {process.env.NODE_ENV === 'development' && (
          <div style={{ 
            marginTop: 24, 
            padding: 16, 
            background: '#fff2f0', 
            border: '1px solid #ffccc7',
            borderRadius: 8,
            maxWidth: 600,
            textAlign: 'left'
          }}>
            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 12 }}>
              {error.message}
            </p>
          </div>
        )}
      </Result>
    </div>
  )
} 