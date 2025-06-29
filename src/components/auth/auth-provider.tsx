"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  phone: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  showAuthModal: (action?: string, businessName?: string) => void
  hideAuthModal: () => void
  authModal: {
    isOpen: boolean
    triggerAction?: string
    businessName?: string
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    triggerAction: undefined as string | undefined,
    businessName: undefined as string | undefined,
  })

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("nexa_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("nexa_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nexa_user")
  }

  const showAuthModal = (action?: string, businessName?: string) => {
    setAuthModal({
      isOpen: true,
      triggerAction: action,
      businessName,
    })
  }

  const hideAuthModal = () => {
    setAuthModal({
      isOpen: false,
      triggerAction: undefined,
      businessName: undefined,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        showAuthModal,
        hideAuthModal,
        authModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
