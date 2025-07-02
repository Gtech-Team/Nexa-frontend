import React from 'react'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { 
  AppState, 
  AppActions, 
  ModalState,
  ModalActions
} from '@/types/auth'

// App-wide store for UI state, preferences, cart, etc.
export const useAppStore = create<AppState & AppActions & ModalState & ModalActions>()(
  devtools(
    persist(
      immer((set) => ({
        // App State
        theme: 'system',
        sidebarOpen: false,
        searchQuery: '',
        currentCity: 'Lagos',
        favoriteBusinesses: [],
        recentSearches: [],
        cartItems: [],

        // Modal State
        authModal: {
          isOpen: false,
          mode: 'login',
          redirectTo: undefined,
          triggerAction: undefined
        },
        businessOnboardingModal: {
          isOpen: false,
          step: 1
        },
        bookingModal: {
          isOpen: false,
          businessId: undefined,
          serviceId: undefined
        },
        negotiationModal: {
          isOpen: false,
          businessId: undefined,
          serviceId: undefined
        },

        // App Actions
        setTheme: (theme) => {
          set((state) => {
            state.theme = theme
          })
          
          // Apply theme to document
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else if (theme === 'light') {
            document.documentElement.classList.remove('dark')
          } else {
            // System theme
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            document.documentElement.classList.toggle('dark', isDark)
          }
        },

        setSidebarOpen: (open) => {
          set((state) => {
            state.sidebarOpen = open
          })
        },

        setSearchQuery: (query) => {
          set((state) => {
            state.searchQuery = query
          })
        },

        setCurrentCity: (city) => {
          set((state) => {
            state.currentCity = city
          })
        },

        addToFavorites: (businessId) => {
          set((state) => {
            if (!state.favoriteBusinesses.includes(businessId)) {
              state.favoriteBusinesses.push(businessId)
            }
          })
        },

        removeFromFavorites: (businessId) => {
          set((state) => {
            state.favoriteBusinesses = state.favoriteBusinesses.filter(id => id !== businessId)
          })
        },

        addRecentSearch: (search) => {
          set((state) => {
            // Remove if already exists
            state.recentSearches = state.recentSearches.filter(s => s !== search)
            // Add to beginning
            state.recentSearches.unshift(search)
            // Keep only last 10
            state.recentSearches = state.recentSearches.slice(0, 10)
          })
        },

        clearRecentSearches: () => {
          set((state) => {
            state.recentSearches = []
          })
        },

        addToCart: (item) => {
          set((state) => {
            // Check if item already exists
            const existingIndex = state.cartItems.findIndex(
              cartItem => cartItem.id === item.id && cartItem.businessId === item.businessId
            )
            
            if (existingIndex >= 0) {
              // Update quantity if exists
              state.cartItems[existingIndex].quantity += item.quantity
            } else {
              // Add new item
              state.cartItems.push(item)
            }
          })
        },

        removeFromCart: (itemId) => {
          set((state) => {
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
          })
        },

        updateCartItem: (itemId, updates) => {
          set((state) => {
            const index = state.cartItems.findIndex(item => item.id === itemId)
            if (index >= 0) {
              state.cartItems[index] = { ...state.cartItems[index], ...updates }
            }
          })
        },

        clearCart: () => {
          set((state) => {
            state.cartItems = []
          })
        },

        // Modal Actions
        openAuthModal: (mode, redirectTo, triggerAction) => {
          set((state) => {
            state.authModal = {
              isOpen: true,
              mode,
              redirectTo,
              triggerAction
            }
          })
        },

        closeAuthModal: () => {
          set((state) => {
            state.authModal = {
              isOpen: false,
              mode: 'login',
              redirectTo: undefined,
              triggerAction: undefined
            }
          })
        },

        openBusinessOnboarding: () => {
          set((state) => {
            state.businessOnboardingModal = {
              isOpen: true,
              step: 1
            }
          })
        },

        closeBusinessOnboarding: () => {
          set((state) => {
            state.businessOnboardingModal = {
              isOpen: false,
              step: 1
            }
          })
        },

        setBusinessOnboardingStep: (step) => {
          set((state) => {
            state.businessOnboardingModal.step = step
          })
        },

        openBookingModal: (businessId, serviceId) => {
          set((state) => {
            state.bookingModal = {
              isOpen: true,
              businessId,
              serviceId
            }
          })
        },

        closeBookingModal: () => {
          set((state) => {
            state.bookingModal = {
              isOpen: false,
              businessId: undefined,
              serviceId: undefined
            }
          })
        },

        openNegotiationModal: (businessId, serviceId) => {
          set((state) => {
            state.negotiationModal = {
              isOpen: true,
              businessId,
              serviceId
            }
          })
        },

        closeNegotiationModal: () => {
          set((state) => {
            state.negotiationModal = {
              isOpen: false,
              businessId: undefined,
              serviceId: undefined
            }
          })
        }
      })),
      {
        name: 'nexa-app-store',
        // Persist everything except modal states
        partialize: (state) => ({
          theme: state.theme,
          currentCity: state.currentCity,
          favoriteBusinesses: state.favoriteBusinesses,
          recentSearches: state.recentSearches,
          cartItems: state.cartItems
        })
      }
    ),
    {
      name: 'nexa-app-store'
    }
  )
)

// Computed selectors
export const useCartTotal = () => {
  return useAppStore(state => 
    state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  )
}

export const useCartCount = () => {
  return useAppStore(state => 
    state.cartItems.reduce((count, item) => count + item.quantity, 0)
  )
}

export const useIsFavorite = (businessId: string) => {
  return useAppStore(state => state.favoriteBusinesses.includes(businessId))
}

// Theme initialization hook
export const useThemeInit = () => {
  const theme = useAppStore(state => state.theme)
  const setTheme = useAppStore(state => state.setTheme)
  
  React.useEffect(() => {
    // Initialize theme on mount
    setTheme(theme)
    
    // Listen for system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => setTheme('system')
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, setTheme])
}
