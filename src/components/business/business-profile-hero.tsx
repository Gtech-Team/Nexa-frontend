"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Business } from "@/types/business"
import { ArrowLeft, Check, Heart, MapPin, Star, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { useState } from "react"

interface BusinessProfileHeroProps {
  business: Business
}

export default function BusinessProfileHero({ business }: BusinessProfileHeroProps) {
  const router = useRouter()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [isToggling, setIsToggling] = useState(false)
  const isBusinessFavorite = isFavorite(business.id)

  const handleFavoriteClick = async () => {
    setIsToggling(true)
    try {
      toggleFavorite({
        id: business.id,
        name: business.name,
        category: business.category,
        city: business.city,
        rating: business.rating,
        price: business.price,
        logo: business.logo,
        verified: business.verified
      })
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsToggling(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="h-48 sm:h-64 bg-gradient-to-r from-[#05BBC8] to-[#049aa5] relative">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Share Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Featured Badge */}
        {business.featured && (
          <div className="absolute top-16 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Business Info Card */}
      <div className="relative -mt-20 mx-4 sm:mx-6 max-w-7xl lg:mx-auto bg-white rounded-2xl shadow-lg border p-4 sm:p-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={business.logo || "/placeholder.svg"}
                alt={business.name}
              />
              <AvatarFallback className="text-sm sm:text-lg font-bold">
                {business.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {business.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 sm:p-2">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>
            )}
          </div>

          {/* Business Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {business.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 mb-3">
                  {business.verified ? (
                    <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm">
                      ✅ Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500 text-xs sm:text-sm">
                      Unverified
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 text-xs sm:text-sm"
                  >
                    {business.category}
                  </Badge>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-3 line-clamp-2">
                  {business.description}
                </p>

                {/* Location and Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{business.city}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(business.rating)}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      ({business.rating}) • 234 reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteClick}
                disabled={isToggling}
                className={`p-1.5 sm:p-2 flex-shrink-0 transition-all duration-200 hover:scale-110 ${
                  isBusinessFavorite 
                    ? "text-red-500 hover:text-red-600" 
                    : "text-gray-400 hover:text-red-500"
                }`}
                aria-label={isBusinessFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
                    isBusinessFavorite ? "fill-current" : ""
                  }`} 
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-xs sm:text-sm text-gray-600">Price Range:</span>
              <span className="ml-2 text-base sm:text-lg font-semibold text-gray-900">
                {business.price}
              </span>
            </div>
            {business.isPopular && (
              <Badge className="bg-orange-100 text-orange-800 self-start sm:self-auto">
                🔥 Popular Choice
              </Badge>
            )}
          </div>
        </div>

        {/* Favorite Status Indicator */}
        {isBusinessFavorite && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-red-500 text-xs">
              <Heart className="w-3 h-3 fill-current" />
              <span>Added to your favorites</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
