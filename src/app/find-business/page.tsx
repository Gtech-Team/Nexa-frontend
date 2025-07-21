"use client"

import { useState } from "react"
import { useFavorites } from "@/hooks/use-favorites"

// Import modular components
import AIRecommendations from "@/components/business/ai-recommendations"
import ModernSearch from "@/components/business/modern-search"
import TabNavigation from "@/components/business/tab-navigation"
import BusinessGrid from "@/components/business/business-grid"
import AIHelperButton from "@/components/business/ai-helper-button"
import PromotionBanner from "@/components/business/promotion-banner"
import Pagination from "@/components/business/pagination"
import Footer from "@/components/footer"
import MobileAuthFAB from "@/components/navigation/mobile-auth-fab"
import NewAuthModal from "@/components/auth/new-auth-modal"
import UserNav from "@/components/navigation/user-nav"
import AnimatedSellButton from "@/components/animated-sell-button"
import MobileHamburgerMenu from "@/components/mobile-hamburger-menu"
import { useAuth } from "@/components/auth/auth-provider"
import Image from "next/image"


// Import types and data
import type { Filters } from "@/types/business"
import { mockBusinesses } from "@/data/mockData"

export default function FindBusinessPage() {
  const { authModal, hideAuthModal } = useAuth()
  const [filters, setFilters] = useState<Filters>({
    city: "All Cities",
    businessType: "All Types",
    sortBy: "AI Recommended",
    searchQuery: "",
  })
  const { favorites, toggleFavorite } = useFavorites()
  const [isLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"featured" | "all" | "nearby">("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [location, setLocation] = useState("Owerri, Nigeria")
  const itemsPerPage = 12

  // Convert favorites to simple string array for compatibility
  const favoriteIds = favorites.map(fav => fav.id)

  // Filter businesses based on current filters and active tab
  const filteredBusinesses = mockBusinesses.filter((business) => {
    const matchesCity = filters.city === "All Cities" || business.city === filters.city
    const matchesType = filters.businessType === "All Types" || business.category === filters.businessType
    const matchesSearch =
      filters.searchQuery === "" ||
      business.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(filters.searchQuery.toLowerCase())

    // Tab filtering
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && business.featured) ||
      (activeTab === "nearby" && business.city === "Owerri") // Mock nearby logic

    return matchesCity && matchesType && matchesSearch && matchesTab
  })

  // Sort businesses based on sort option
  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    switch (filters.sortBy) {
      case "AI Recommended":
        return b.matchScore - a.matchScore
      case "Most Popular":
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
      case "Highest Rated":
        return b.rating - a.rating
      case "Price: Low to High":
        return (
          Number.parseInt(a.price.split(" - ")[0].replace(/[₦,]/g, "")) -
          Number.parseInt(b.price.split(" - ")[0].replace(/[₦,]/g, ""))
        )
      case "Price: High to Low":
        return (
          Number.parseInt(b.price.split(" - ")[1].replace(/[₦,]/g, "")) -
          Number.parseInt(a.price.split(" - ")[1].replace(/[₦,]/g, ""))
        )
      default:
        return 0
    }
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedBusinesses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBusinesses = sortedBusinesses.slice(startIndex, endIndex)

  const handleToggleFavorite = (businessId: string) => {
    const business = mockBusinesses.find(b => b.id === businessId)
    if (business) {
      toggleFavorite({
        id: business.id,
        name: business.name,
        category: business.category,
        city: business.city,
        rating: business.rating,
        price: business.price,
        logo: business.logo,
        verified: business.verified,
        totalReviews: business.totalReviews ?? 0,
        images: business.images ?? [],
      })
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleTabChange = (tab: "featured" | "all" | "nearby") => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to first page when tab changes
  }

  // Modern search handlers
  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }))
    setCurrentPage(1)
  }

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)
    // You can also update filters here if needed
    // setFilters(prev => ({ ...prev, city: newLocation }))
  }

  const handleImageSearch = (file: File) => {
    // Placeholder for image search functionality
    console.log('Image search with file:', file.name)
    // Here you would typically upload the file to your backend
    // and perform reverse image search
  }

  const handleModernFiltersChange = (newFilters: {
    category: string
    city: string
    priceRange: string
    rating: string
    sortBy: string
  }) => {
    // Map modern filters to existing filter structure
    setFilters(prev => ({
      ...prev,
      businessType: newFilters.category || 'All Types',
      city: newFilters.city || 'All Cities',
      sortBy: newFilters.sortBy
    }))
    setCurrentPage(1)
  }

  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Super Heading - Above main navigation */}
      <div className="bg-gradient-to-r from-[#05BBC8]/10 via-blue-50/30 to-purple-50/20 border-b border-[#05BBC8]/20 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <AnimatedSellButton className="border-[#05BBC8]/60 hover:border-[#05BBC8]" />
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 11.37a11.045 11.045 0 005.516 5.516l1.983-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V6z" />
              </svg>
              <a href="tel:08160821253" className="font-medium text-sm hover:text-[#05BBC8] transition-colors">
                08160821253
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Super Heading */}
      <div className="bg-gradient-to-r from-[#05BBC8]/10 via-blue-50/30 to-purple-50/20 border-b border-[#05BBC8]/20 block md:hidden">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <AnimatedSellButton className="border-[#05BBC8]/60 hover:border-[#05BBC8] text-xs" />
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 11.37a11.045 11.045 0 005.516 5.516l1.983-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V6z" />
              </svg>
              <a href="tel:08160821253" className="font-medium text-xs hover:text-[#05BBC8] transition-colors">
                08160821253
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      
      <header className="border-b border-gray-200 sticky top-0 z-40 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="mr-3 rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#05BBC8] transition cursor-pointer hidden md:block"
                  aria-label="Go back"
                >
                  {/* Lucide ArrowLeft icon */}
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden">
                  <MobileHamburgerMenu 
                    onLocationFilter={(city) => {
                      handleFiltersChange({ ...filters, city: city });
                    }}
                    onCategoryFilter={(category) => {
                      handleFiltersChange({ ...filters, businessType: category });
                    }}
                  />
                </div>

                    <Image
                    src="/nexa-favicon.png"
                    alt="Nexa Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                    priority
                    />
                <span className="text-xl font-semibold text-gray-900">Nexa</span>
              </div>
              <div className="hidden md:block text-gray-500">|</div>
              <h1 className="hidden md:block text-lg font-medium text-gray-900">Find a Business</h1>
              {/* Mobile title */}
              <h1 className="block md:hidden text-lg font-medium text-gray-900 ml-2">Find Business</h1>
            </div>
            
            {/* User Navigation */}
            <UserNav />
          </div>
        </div>
      </header>
        
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Modern Search Section */}
        <div className="mb-8">
          <ModernSearch 
            onSearch={handleSearch}
            onLocationChange={handleLocationChange}
            onImageSearch={handleImageSearch}
            location={location}
            onFiltersChange={handleModernFiltersChange}
            businesses={mockBusinesses}
          />
        </div>

        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Business Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-[#05BBC8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Finding the best businesses for you...</p>
          </div>
        ) : (
          <BusinessGrid 
            businesses={currentBusinesses} 
            favorites={favoriteIds} 
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Pagination */}
        {sortedBusinesses.length > itemsPerPage && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}


        {/* AI Recommendations */}
        <div className="mb-8 mt-8">
          <AIRecommendations businesses={mockBusinesses} />
        </div>
                {/* Promotion Banner */}
        <PromotionBanner />
      </main>

      {/* AI Helper Button */}
      <AIHelperButton />

      {/* Mobile Auth FAB */}
      <MobileAuthFAB />

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <NewAuthModal
        isOpen={authModal.isOpen}
        onClose={hideAuthModal}
        triggerAction={authModal.triggerAction}
        businessName={authModal.businessName}
      />
    </div>
  )
}
