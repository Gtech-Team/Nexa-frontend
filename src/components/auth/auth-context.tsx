"use client"

import { createContext, useContext, ReactNode, useState } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  showAuthModal: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
  login: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const openAuthModal = () => setShowAuthModal(true)
  const closeAuthModal = () => setShowAuthModal(false)

  const login = async () => {
    // Mock login logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsAuthenticated(true)
    closeAuthModal()
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      showAuthModal,
      openAuthModal,
      closeAuthModal,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
