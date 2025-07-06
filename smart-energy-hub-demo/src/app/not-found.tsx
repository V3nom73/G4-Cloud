'use client'

import { Button, Result } from 'antd'
import { HomeOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Result
          icon={
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ThunderboltOutlined style={{ fontSize: 120, color: '#52c41a' }} />
            </motion.div>
          }
          title="404"
          subTitle="Ups! Diese Seite konnte nicht gefunden werden."
          extra={[
            <Button 
              type="primary" 
              key="home" 
              icon={<HomeOutlined />}
              size="large"
              href="/"
            >
              Zurück zur Startseite
            </Button>,
            <Button 
              key="support" 
              size="large"
              href="/login"
            >
              Zum Login
            </Button>
          ]}
        />
      </motion.div>
    </div>
  )
} 