// Import for local use
import { useAuthStore } from './auth-store'
import { 
  useAppStore, 
  useCartTotal, 
  useCartCount
} from './app-store'

// Re-export all store hooks and utilities for easy access
export { useAuthStore, useAuthInit } from './auth-store'
export { 
  useAppStore, 
  useCartTotal, 
  useCartCount, 
  useIsFavorite, 
  useThemeInit 
} from './app-store'

// Combined hooks for common use cases
export const useAuth = () => {
  return useAuthStore()
}

export const useModal = () => {
  const store = useAppStore()
  return {
    authModal: store.authModal,
    businessOnboardingModal: store.businessOnboardingModal,
    bookingModal: store.bookingModal,
    negotiationModal: store.negotiationModal,
    openAuthModal: store.openAuthModal,
    closeAuthModal: store.closeAuthModal,
    openBusinessOnboarding: store.openBusinessOnboarding,
    closeBusinessOnboarding: store.closeBusinessOnboarding,
    setBusinessOnboardingStep: store.setBusinessOnboardingStep,
    openBookingModal: store.openBookingModal,
    closeBookingModal: store.closeBookingModal,
    openNegotiationModal: store.openNegotiationModal,
    closeNegotiationModal: store.closeNegotiationModal
  }
}

export const useCart = () => {
  const store = useAppStore()
  const cartTotal = useCartTotal()
  const cartCount = useCartCount()

  return {
    cartItems: store.cartItems,
    cartTotal,
    cartCount,
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateCartItem: store.updateCartItem,
    clearCart: store.clearCart
  }
}

export const useApp = () => {
  const store = useAppStore()
  return {
    theme: store.theme,
    sidebarOpen: store.sidebarOpen,
    searchQuery: store.searchQuery,
    currentCity: store.currentCity,
    favoriteBusinesses: store.favoriteBusinesses,
    recentSearches: store.recentSearches,
    setTheme: store.setTheme,
    setSidebarOpen: store.setSidebarOpen,
    setSearchQuery: store.setSearchQuery,
    setCurrentCity: store.setCurrentCity,
    addToFavorites: store.addToFavorites,
    removeFromFavorites: store.removeFromFavorites,
    addRecentSearch: store.addRecentSearch,
    clearRecentSearches: store.clearRecentSearches
  }
}
