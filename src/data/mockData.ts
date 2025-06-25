import { Business } from "@/types/business"

// Mock data - replace with API calls
export const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Tantalizers",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Restaurant",
    city: "Owerri",
    description: "Delicious local and continental dishes with fast service",
    rating: 4.5,
    matchScore: 95,
    type: "order",
    price: "₦2,000 - ₦5,000",
    isPopular: true,
    isFeatured: true,
    featured: true,
    verified: true,
    isPromoted: true,
  },
  {
    id: "2",
    name: "Genesis Deluxe Hotel",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Hotel",
    city: "Owerri",
    description: "Luxury accommodation with modern amenities",
    rating: 4.8,
    matchScore: 88,
    type: "booking",
    price: "₦15,000 - ₦35,000",
    isPopular: true,
    featured: true,
    verified: true,
    isPromoted: true,
  },
  {
    id: "3",
    name: "AutoFix Garage",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Repair Shop",
    city: "Aba",
    description: "Professional car repair and maintenance services",
    rating: 4.2,
    matchScore: 82,
    type: "negotiation",
    price: "₦5,000 - ₦50,000",
    featured: false,
    verified: true,
    isPromoted: false,
  },
  {
    id: "4",
    name: "Chicken Republic",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Restaurant",
    city: "Lagos",
    description: "Fast food chain with Nigerian and continental meals",
    rating: 4.3,
    matchScore: 79,
    type: "order",
    price: "₦1,500 - ₦4,000",
    isPopular: true,
    featured: false,
    verified: false,
    isPromoted: false,
  },
  {
    id: "5",
    name: "Transcorp Hilton",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Hotel",
    city: "Abuja",
    description: "5-star luxury hotel with world-class facilities",
    rating: 4.9,
    matchScore: 91,
    type: "booking",
    price: "₦45,000 - ₦120,000",
    isFeatured: true,
    featured: true,
    verified: true,
    isPromoted: true,
  },
  {
    id: "6",
    name: "Beauty Palace Spa",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Beauty & Spa",
    city: "Owerri",
    description: "Full-service beauty salon and spa treatments",
    rating: 4.6,
    matchScore: 86,
    type: "booking",
    price: "₦3,000 - ₦15,000",
    featured: false,
    verified: true,
    isPromoted: false,
  },
  {
    id: "7",
    name: "Quick Bite Eatery",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Restaurant",
    city: "Owerri",
    description: "Local fast food with affordable prices",
    rating: 3.8,
    matchScore: 72,
    type: "order",
    price: "₦800 - ₦2,500",
    featured: false,
    verified: false,
    isPromoted: false,
  },
]

export const cities = ["All Cities", "Owerri", "Aba", "Lagos", "Abuja", "Port Harcourt"]
export const businessTypes = ["All Types", "Restaurant", "Hotel", "Repair Shop", "Beauty & Spa", "Entertainment"]
export const sortOptions = ["AI Recommended", "Most Popular", "Highest Rated", "Price: Low to High", "Price: High to Low"]

// TODO: Replace with actual API calls
export const businessAPI = {
  async getBusinesses(filters?: Partial<Record<string, unknown>>): Promise<Business[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    // TODO: Apply filters when backend is ready
    console.log('Filters would be applied:', filters)
    return mockBusinesses
  },
  
  async getRecommendedBusinesses(limit: number = 5): Promise<Business[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockBusinesses
      .filter(b => b.matchScore > 85)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
  },
  
  async getCities(): Promise<string[]> {
    return cities
  },
  
  async getBusinessTypes(): Promise<string[]> {
    return businessTypes
  }
}
