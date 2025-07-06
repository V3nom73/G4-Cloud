'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  userEmail: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const login = (email: string, password: string) => {
    // Demo-Login-Logik
    if ((email === 'admin' && password === 'admin') || 
        (email === 'user' && password === 'user')) {
      setIsAuthenticated(true)
      setUserEmail(email)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('isAuthenticated', 'true')
        sessionStorage.setItem('userEmail', email)
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserEmail(null)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isAuthenticated')
      sessionStorage.removeItem('userEmail')
    }
  }

  // Check for existing session on mount
  if (typeof window !== 'undefined' && !isAuthenticated) {
    const storedAuth = sessionStorage.getItem('isAuthenticated')
    const storedEmail = sessionStorage.getItem('userEmail')
    if (storedAuth === 'true' && storedEmail) {
      setIsAuthenticated(true)
      setUserEmail(storedEmail)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 