import { Search } from "lucide-react"
import { BusinessGridProps } from "@/types/business"
import BusinessCard from "./business-card"

export default function BusinessGrid({ businesses, favorites, onToggleFavorite, isLoading = false }: BusinessGridProps) {
  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-4 sm:p-6 animate-pulse">
              <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (businesses.length === 0) {
    return (
      <section>
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
          <p className="text-gray-600 text-sm sm:text-base">Try adjusting your filters or search terms</p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {businesses.length} business{businesses.length !== 1 ? 'es' : ''} found
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {businesses.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(business.id)}
          />
        ))}
      </div>
    </section>
  )
}
