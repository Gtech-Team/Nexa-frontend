// Types for business-related data
export interface Business {
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
