import { Search } from "lucide-react"
import { BusinessGridProps } from "@/types/business"
import BusinessCardMobile from "./business-card-mobile"

export default function BusinessGrid({ businesses, favorites, onToggleFavorite, isLoading = false }: BusinessGridProps) {
  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 animate-pulse overflow-hidden">
              {/* Image skeleton */}
              <div className="h-32 bg-gray-200"></div>
              {/* Content skeleton */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-12"></div>
                    <div className="h-6 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {businesses.map((business) => (
          <div key={business.id} className="w-full">
            {/* Use mobile card design for all screen sizes */}
            <BusinessCardMobile
              business={business}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(business.id)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
