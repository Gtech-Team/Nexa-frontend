'use client'

import { useState } from "react"
import { Heart, MapPin, Star, Verified, Eye, ShoppingCart, Calendar, MessageCircle, Check } from "lucide-react"
import Image from "next/image"
import type { Business } from "@/types/business"
import { useRouter } from "next/navigation"

interface BusinessCardMobileProps {
  business: Business
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
  onViewClick?: (business: Business) => void
  onOrderClick?: (business: Business) => void
  onBookClick?: (business: Business) => void
  onNegotiateClick?: (business: Business) => void
}

export default function BusinessCardMobile({ 
  business, 
  onToggleFavorite, 
  isFavorite, 
  onViewClick,
  onOrderClick,
  onBookClick,
  onNegotiateClick 
}: BusinessCardMobileProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const router = useRouter()

  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path)
    try {
      router.push(path)
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
      {/* Featured border overlay - only show if featured */}
      {business.featured && (
        <div className="absolute inset-0 rounded-2xl  pointer-events-none z-0"></div>
      )}
      {/* Business Image */}
      <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200">
        {business.coverImage ? (
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : business.images && business.images.length > 0 ? (
          <Image
            src={business.images[0]}
            alt={business.name}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        )}
        
        {/* Featured Badge */}
        {business.featured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg z-10">
            <Star className="w-2 h-2 fill-current" />
            <span>Featured</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation() // Prevent card click from triggering
            onToggleFavorite(business.id)
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Logo */}
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
              {business.logo ? (
                <Image
                  src={business.logo}
                  alt={`${business.name} logo`}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#05BBC8]/20 to-[#05BBC8]/10">
                  <span className="text-[#05BBC8] text-xs font-bold">
                    {business.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Name and Category */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">
                  {business.name}
                </h3>
                {business.verified && (
                  <Verified className="w-3 h-3 text-blue-500 fill-blue-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
                {business.verified && (
                  <div className="bg-blue-100 text-blue-800 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    <Check className="w-2.5 h-2.5" />
                    <span>Verified</span>
                  </div>
                )}
                <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs max-w-full break-words">
                  {business.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Location and Rating */}
        <div className="flex items-center justify-between mb-2 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{business.city}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="font-medium">{business.rating}</span>
            <span className="text-gray-400">({business.totalReviews || 0})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
          {business.description}
        </p>

        {/* Price */}
        <div className="mb-3 pt-2 border-t border-gray-50">
          <div className="text-left">
            <span className="font-bold text-[#05BBC8] text-sm">{business.price}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full relative z-10">
          {/* View Button */}
          <button 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log("View button clicked - Navigating to business ID:", business.id)
              
              // Use callback if provided, otherwise navigate
              if (onViewClick) {
                onViewClick(business)
              } else {
                handleNavigation(`/business/${business.id}`)
              }
            }}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:border-[#05BBC8] hover:text-[#05BBC8] transition-colors text-xs relative z-10 cursor-pointer"
          >
            <Eye className="w-3 h-3" />
            <span>View</span>
          </button>

          {/* Dynamic Button based on business type */}
          {(() => {
            const btnClass = "flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#05BBC8] text-white rounded-lg hover:bg-[#049aa5] transition-colors text-xs";
            
            switch(business.type) {
              case "order":
                return (
                    <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log("Order button clicked for business:", business.id)
                      if (onOrderClick) {
                      onOrderClick(business)
                      }
                    }} 
                    className={`${btnClass} cursor-pointer`}
                    >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Order</span>
                    </button>
                );
              case "booking":
                return (
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log("Book button clicked for business:", business.id)
                      if (onBookClick) {
                        onBookClick(business)
                      }
                    }} 
                    className={`${btnClass} cursor-pointer`}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book</span>
                  </button>
                );
              case "negotiation":
                return (
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log("Negotiate button clicked for business:", business.id)
                      if (onNegotiateClick) {
                        onNegotiateClick(business)
                      }
                    }} 
                    className={`${btnClass} cursor-pointer`}
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Negotiate</span>
                  </button>
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  )
}
