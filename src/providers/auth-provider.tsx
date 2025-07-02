"use client"

import { createContext, useContext, type ReactNode } from 'react'
import { useAuth, useAuthInit, useThemeInit } from '@/store'

// Create context for additional auth utilities
interface AuthContextType {
  // Gated action helpers
  requireAuth: (action: () => void, actionType?: string) => void
  isBusinessOwner: boolean
  isAdmin: boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize auth and theme
  useAuthInit()
  useThemeInit()
  
  const { user, isAuthenticated } = useAuth()

  // Helper functions for gated actions
  const requireAuth = (action: () => void, actionType?: string) => {
    if (!isAuthenticated) {
      // Import modal actions dynamically to avoid circular dependencies
      import('@/store').then(({ useModal }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { openAuthModal } = useModal()
        openAuthModal('login', undefined, actionType)
      })
      return
    }
    
    action()
  }

  const isBusinessOwner = user?.role === 'business_owner'
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin'
  
  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    
    // Basic permission system - expand as needed
    switch (permission) {
      case 'manage_business':
        return isBusinessOwner || isAdmin
      case 'admin_panel':
        return isAdmin
      case 'super_admin':
        return user.role === 'super_admin'
      case 'leave_review':
        return isAuthenticated
      case 'make_booking':
        return isAuthenticated
      case 'negotiate_price':
        return isAuthenticated
      default:
        return false
    }
  }

  const value: AuthContextType = {
    requireAuth,
    isBusinessOwner,
    isAdmin,
    hasPermission
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

// Re-export store hooks for convenience
export { useAuth, useModal, useCart, useApp } from '@/store'
