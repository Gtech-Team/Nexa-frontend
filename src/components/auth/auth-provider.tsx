"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiClient, type User, type LoginRequest, type RegisterRequest } from "@/lib/api"
import { googleAuth } from "@/lib/google-auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message?: string }>
  register: (userData: RegisterRequest) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; message?: string }>
  showAuthModal: (action?: string, businessName?: string) => void
  hideAuthModal: () => void
  signInWithGoogle: () => Promise<void>
  authModal: {
    isOpen: boolean
    triggerAction?: string
    businessName?: string
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    triggerAction: undefined as string | undefined,
    businessName: undefined as string | undefined,
  })

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we have stored tokens
        const storedUser = apiClient.getStoredUser()
        const accessToken = apiClient.getAccessToken()
        
        if (storedUser && accessToken) {
          // Verify the session with the backend
          const response = await apiClient.getAuthStatus()
          
          if (response.success && response.data?.isAuthenticated && response.data.user) {
            setUser(response.data.user)
          } else {
            // Clear invalid session data
            apiClient.clearAuthData()
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        apiClient.clearAuthData()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes from Google OAuth
    const handleAuthStateChange = (event: CustomEvent) => {
      if (event.detail.isAuthenticated) {
        setUser(event.detail.user)
        hideAuthModal()
      }
    }

    window.addEventListener('auth-state-changed', handleAuthStateChange as EventListener)
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthStateChange as EventListener)
    }
  }, [])

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true)
      const response = await apiClient.login(credentials)
      
      if (response.success && response.data) {
        apiClient.setAuthData(response.data)
        setUser(response.data.user)
        hideAuthModal()
        return { success: true }
      } else {
        return { 
          success: false, 
          message: response.message || 'Login failed' 
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: 'An unexpected error occurred during login' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterRequest): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true)
      const response = await apiClient.register(userData)
      
      if (response.success && response.data) {
        apiClient.setAuthData(response.data)
        setUser(response.data.user)
        hideAuthModal()
        return { success: true }
      } else {
        return { 
          success: false, 
          message: response.message || 'Registration failed' 
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        message: 'An unexpected error occurred during registration' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await apiClient.logout()
      await googleAuth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      // Clear local data even if server request fails
      apiClient.clearAuthData()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true)
      const response = await apiClient.updateProfile(updates)
      
      if (response.success && response.data) {
        setUser(response.data)
        // Update stored user data
        localStorage.setItem('nexa_user', JSON.stringify(response.data))
        return { success: true }
      } else {
        return { 
          success: false, 
          message: response.message || 'Profile update failed' 
        }
      }
    } catch (error) {
      console.error('Profile update error:', error)
      return { 
        success: false, 
        message: 'An unexpected error occurred during profile update' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await googleAuth.signInWithPopup()
      // Google auth callback will handle the rest
    } catch (error) {
      console.error('Google sign-in error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
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
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        showAuthModal,
        hideAuthModal,
        signInWithGoogle,
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
