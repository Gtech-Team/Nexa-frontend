// Types for business-related data
export interface Business {
  images: string[]
  coverImage?: string
  totalReviews: number
  id: string
  name: string
  logo: string
  category: string
  city: string
  description: string
  rating: number
  matchScore: number
  type: "order" | "booking" | "negotiation"
  price: string
  isPopular?: boolean
  isFeatured?: boolean
  featured: boolean
  verified: boolean
  isPromoted: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  price: string
  duration: string
  rating: number
  category: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: string
  rating: number
  category: string
  variants?: ProductVariant[]
  inStock?: boolean
}

export interface ProductVariant {
  id: string
  name: string
  available: boolean
  priceAdjustment?: number
}

export interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface Filters {
  city: string
  businessType: string
  sortBy: string
  searchQuery: string
}

export interface SearchFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  cities: string[]
  businessTypes: string[]
  sortOptions: string[]
  isLoading?: boolean
}

export interface BusinessCardProps {
  business: Business
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
}

export interface BusinessGridProps {
  businesses: Business[]
  favorites: string[]
  onToggleFavorite: (id: string) => void
  isLoading?: boolean
}

export interface AIRecommendationsProps {
  businesses: Business[]
  isLoading?: boolean
}

export type TabType = "featured" | "all" | "nearby"

export interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}
