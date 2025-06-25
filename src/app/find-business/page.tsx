"use client"

import { useState } from "react"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft } from "lucide-react"
// import Link from "next/link"

// Import modular components
import AIRecommendations from "@/components/business/ai-recommendations"
import SearchFilters from "@/components/business/search-filters"
import TabNavigation from "@/components/business/tab-navigation"
import BusinessGrid from "@/components/business/business-grid"
import AIHelperButton from "@/components/business/ai-helper-button"
import PromotionBanner from "@/components/business/promotion-banner"
import Pagination from "@/components/business/pagination"
import PageHeader from "@/components/business/page-header"

// Import types and data
import type { Filters } from "@/types/business"
import { mockBusinesses, cities, businessTypes, sortOptions } from "@/data/mockData"

export default function FindBusinessPage() {
  const [filters, setFilters] = useState<Filters>({
    city: "All Cities",
    businessType: "All Types",
    sortBy: "AI Recommended",
    searchQuery: "",
  })
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"featured" | "all" | "nearby">("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

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
    setFavorites((prev) => (prev.includes(businessId) ? prev.filter((id) => id !== businessId) : [...prev, businessId]))
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Find a Business"
        favoritesCount={favorites.length}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* AI Recommendations */}
        <AIRecommendations businesses={mockBusinesses} />

        {/* Search Filters */}
        <SearchFilters 
          filters={filters} 
          onFiltersChange={handleFiltersChange}
          cities={cities}
          businessTypes={businessTypes}
          sortOptions={sortOptions}
        />

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
            favorites={favorites} 
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

        {/* Promotion Banner */}
        <PromotionBanner />
      </main>

      {/* AI Helper Button */}
      <AIHelperButton />
    </div>
  )
}
