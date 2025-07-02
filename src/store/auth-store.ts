import React from 'react'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import type { 
  User, 
  Business, 
  AuthTokens, 
  AuthState, 
  AuthActions, 
  RegisterData, 
  LoginData, 
  AuthResponse
} from '@/types/auth'

// API service functions (these will be replaced with real API calls)
const authAPI = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock response
    return {
      user: {
        id: '1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+234 803 123 4567',
        avatar: '/placeholder.svg',
        role: 'customer',
        status: 'active',
        emailVerified: true,
        phoneVerified: true,
        preferences: {
          notifications: {
            email: true,
            sms: true,
            push: true,
            marketing: false
          },
          privacy: {
            profileVisibility: 'public',
            showPhone: true,
            showEmail: false
          },
          location: {
            city: 'Lagos',
            state: 'Lagos',
            allowLocationAccess: true
          },
          language: 'en',
          timezone: 'Africa/Lagos'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      tokens: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      },
      message: 'Login successful'
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return {
      user: {
        id: '1',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        role: userData.role,
        status: 'active',
        emailVerified: false,
        phoneVerified: false,
        preferences: {
          notifications: {
            email: true,
            sms: true,
            push: true,
            marketing: false
          },
          privacy: {
            profileVisibility: 'public',
            showPhone: true,
            showEmail: false
          },
          location: {
            allowLocationAccess: false
          },
          language: 'en',
          timezone: 'Africa/Lagos'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      tokens: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
      },
      message: 'Registration successful'
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    console.log('Refreshing token:', refreshToken)
    
    return {
      accessToken: 'new-mock-access-token',
      refreshToken: 'new-mock-refresh-token',
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    }
  },

  async getUserProfile(userId: string): Promise<User> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    console.log('Fetching user profile:', userId)
    
    throw new Error('User not found')
  },

  async updateUserProfile(userId: string, userData: Partial<User>): Promise<User> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log('Updating user profile:', userId, userData)
    
    throw new Error('Update failed')
  }
}

// Token management utilities
const tokenUtils = {
  setTokens(tokens: AuthTokens) {
    // Store access token as httpOnly cookie in production
    // For now using secure cookies
    Cookies.set('nexa_access_token', tokens.accessToken, {
      expires: new Date(tokens.expiresAt),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    
    // Store refresh token more securely
    Cookies.set('nexa_refresh_token', tokens.refreshToken, {
      expires: 30, // 30 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: false // Will be httpOnly in production backend
    })
  },

  getTokens(): AuthTokens | null {
    const accessToken = Cookies.get('nexa_access_token')
    const refreshToken = Cookies.get('nexa_refresh_token')
    
    if (!accessToken || !refreshToken) return null
    
    try {
      const decoded: { exp: number } = jwtDecode(accessToken)
      return {
        accessToken,
        refreshToken,
        expiresAt: decoded.exp * 1000
      }
    } catch {
      return null
    }
  },

  clearTokens() {
    Cookies.remove('nexa_access_token')
    Cookies.remove('nexa_refresh_token')
  },

  isTokenExpired(token: string): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token)
      return Date.now() >= decoded.exp * 1000
    } catch {
      return true
    }
  }
}

// Create the auth store
export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        user: null,
        business: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, password: string) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await authAPI.login({ email, password })
            
            // Store tokens securely
            tokenUtils.setTokens(response.tokens)
            
            set((state) => {
              state.user = response.user
              state.business = response.business || null
              state.tokens = response.tokens
              state.isAuthenticated = true
              state.isLoading = false
              state.error = null
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = error instanceof Error ? error.message : 'Login failed'
            })
            throw error
          }
        },

        register: async (userData: RegisterData) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await authAPI.register(userData)
            
            // Store tokens securely
            tokenUtils.setTokens(response.tokens)
            
            set((state) => {
              state.user = response.user
              state.business = response.business || null
              state.tokens = response.tokens
              state.isAuthenticated = true
              state.isLoading = false
              state.error = null
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = error instanceof Error ? error.message : 'Registration failed'
            })
            throw error
          }
        },

        logout: () => {
          // Clear tokens
          tokenUtils.clearTokens()
          
          set((state) => {
            state.user = null
            state.business = null
            state.tokens = null
            state.isAuthenticated = false
            state.error = null
          })
        },

        refreshAuth: async () => {
          const tokens = tokenUtils.getTokens()
          
          if (!tokens || !tokens.refreshToken) {
            get().logout()
            return
          }

          // If access token is not expired, no need to refresh
          if (!tokenUtils.isTokenExpired(tokens.accessToken)) {
            return
          }

          try {
            const newTokens = await authAPI.refreshToken(tokens.refreshToken)
            tokenUtils.setTokens(newTokens)
            
            set((state) => {
              state.tokens = newTokens
            })
          } catch (error) {
            // If refresh fails, logout user
            get().logout()
            throw error
          }
        },

        updateUser: async (userData: Partial<User>) => {
          const { user } = get()
          if (!user) throw new Error('No user logged in')

          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const updatedUser = await authAPI.updateUserProfile(user.id, userData)
            
            set((state) => {
              state.user = updatedUser
              state.isLoading = false
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = error instanceof Error ? error.message : 'Update failed'
            })
            throw error
          }
        },

        updateBusiness: async (businessData: Partial<Business>) => {
          const { business } = get()
          if (!business) throw new Error('No business associated with user')

          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            // Mock implementation - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 800))
            
            set((state) => {
              if (state.business) {
                state.business = { ...state.business, ...businessData }
              }
              state.isLoading = false
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = error instanceof Error ? error.message : 'Business update failed'
            })
            throw error
          }
        },

        clearError: () => {
          set((state) => {
            state.error = null
          })
        },

        setLoading: (loading: boolean) => {
          set((state) => {
            state.isLoading = loading
          })
        }
      })),
      {
        name: 'nexa-auth-store',
        // Only persist user data, not tokens (tokens are in cookies)
        partialize: (state) => ({
          user: state.user,
          business: state.business,
          isAuthenticated: state.isAuthenticated
        }),
        // Initialize from cookies on hydration
        onRehydrateStorage: () => (state) => {
          if (state) {
            const tokens = tokenUtils.getTokens()
            if (tokens && !tokenUtils.isTokenExpired(tokens.accessToken)) {
              state.tokens = tokens
              state.isAuthenticated = true
            } else {
              // Clear invalid session
              state.user = null
              state.business = null
              state.isAuthenticated = false
              tokenUtils.clearTokens()
            }
          }
        }
      }
    ),
    {
      name: 'nexa-auth-store'
    }
  )
)

// Auth initialization hook
export const useAuthInit = () => {
  const refreshAuth = useAuthStore(state => state.refreshAuth)
  
  // Auto-refresh tokens on app start
  React.useEffect(() => {
    refreshAuth().catch(() => {
      // Ignore refresh errors on init
    })
  }, [refreshAuth])
}
