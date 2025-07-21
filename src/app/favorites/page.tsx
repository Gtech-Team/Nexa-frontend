"use client"

import { useFavorites } from "@/hooks/use-favorites"
import BusinessCard from "@/components/business/business-card"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites, isLoading } = useFavorites()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#05BBC8]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/find-business">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <span>My Favorites</span>
              </h1>
              <p className="text-gray-600 mt-1">
                {favorites.length} saved {favorites.length === 1 ? 'business' : 'businesses'}
              </p>
            </div>
          </div>
        </div>

        {/* Favorites List */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring and save businesses you like by clicking the heart icon
            </p>
            <Link href="/find-business">
              <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                Explore Businesses
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="relative">
                <BusinessCard
                  business={{
                    id: favorite.id,
                    name: favorite.name,
                    category: favorite.category,
                    city: favorite.city,
                    rating: favorite.rating,
                    price: favorite.price,
                    logo: favorite.logo ?? "",
                    description: `Saved on ${new Date(favorite.addedAt).toLocaleDateString()}`,
                    verified: favorite.verified || true,
                    featured: false,
                    isPopular: false,
                    isPromoted: true,
                    type: "booking",
                    matchScore: 0,
                    totalReviews: favorite.totalReviews ?? 0,
                    images: favorite.images ?? [],  
                  }}
                  isFavorite={true}
                  onToggleFavorite={() => {}}
                />
                <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
