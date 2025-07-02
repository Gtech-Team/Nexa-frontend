// User types for the entire application
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: 'customer' | 'business_owner' | 'admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification'
  emailVerified: boolean
  phoneVerified: boolean
  businessId?: string // For business owners
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    marketing: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private'
    showPhone: boolean
    showEmail: boolean
  }
  location: {
    city?: string
    state?: string
    allowLocationAccess: boolean
  }
  language: 'en' | 'ha' | 'ig' | 'yo'
  timezone: string
}

export interface Business {
  id: string
  name: string
  description: string
  category: string
  subcategory?: string
  ownerId: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  businessHours: {
    [key: string]: {
      open: string
      close: string
      isOpen: boolean
    }
  }
  images: string[]
  logo?: string
  website?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
    whatsapp?: string
  }
  verification: {
    isVerified: boolean
    verificationDate?: string
    documents: string[]
  }
  rating: {
    average: number
    count: number
  }
  features: {
    acceptsOnlineBooking: boolean
    allowsNegotiation: boolean
    hasDelivery: boolean
    acceptsPayment: boolean
  }
  status: 'active' | 'inactive' | 'suspended' | 'pending_approval'
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface AuthState {
  user: User | null
  business: Business | null // For business owners
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  refreshAuth: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  updateBusiness: (businessData: Partial<Business>) => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role: 'customer' | 'business_owner'
  businessInfo?: {
    name: string
    category: string
    city: string
    description: string
  }
}

export interface LoginData {
  email: string
  password: string
  rememberMe?: boolean
}

// API Response types
export interface AuthResponse {
  user: User
  business?: Business
  tokens: AuthTokens
  message: string
}

export interface ApiError {
  message: string
  code: string
  field?: string
}

// App-wide state types
export interface AppState {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  searchQuery: string
  currentCity: string
  favoriteBusinesses: string[]
  recentSearches: string[]
  cartItems: CartItem[]
}

export interface CartItem {
  id: string
  businessId: string
  businessName: string
  serviceName: string
  price: number
  quantity: number
  selectedDate?: string
  selectedTime?: string
  notes?: string
}

export interface AppActions {
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setSidebarOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
  setCurrentCity: (city: string) => void
  addToFavorites: (businessId: string) => void
  removeFromFavorites: (businessId: string) => void
  addRecentSearch: (search: string) => void
  clearRecentSearches: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateCartItem: (itemId: string, updates: Partial<CartItem>) => void
  clearCart: () => void
}

// Modal types for auth flow
export interface ModalState {
  authModal: {
    isOpen: boolean
    mode: 'login' | 'register' | 'forgot-password' | 'verify-email'
    redirectTo?: string
    triggerAction?: string
  }
  businessOnboardingModal: {
    isOpen: boolean
    step: number
  }
  bookingModal: {
    isOpen: boolean
    businessId?: string
    serviceId?: string
  }
  negotiationModal: {
    isOpen: boolean
    businessId?: string
    serviceId?: string
  }
}

export interface ModalActions {
  openAuthModal: (mode: 'login' | 'register' | 'forgot-password', redirectTo?: string, triggerAction?: string) => void
  closeAuthModal: () => void
  openBusinessOnboarding: () => void
  closeBusinessOnboarding: () => void
  setBusinessOnboardingStep: (step: number) => void
  openBookingModal: (businessId: string, serviceId?: string) => void
  closeBookingModal: () => void
  openNegotiationModal: (businessId: string, serviceId?: string) => void
  closeNegotiationModal: () => void
}

// Combined store type
export type NevaStore = AuthState & 
  AuthActions & 
  AppState & 
  AppActions & 
  ModalState & 
  ModalActions
