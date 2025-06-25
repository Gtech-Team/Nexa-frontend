import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, Star, MapPin, Check, ShoppingCart, Calendar, MessageCircle } from "lucide-react"
import { BusinessCardProps } from "@/types/business"

export default function BusinessCard({ business, onToggleFavorite, isFavorite }: BusinessCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const getActionButton = () => {
    const baseClasses = "bg-[#05BBC8] hover:bg-[#049aa5] text-white text-xs sm:text-sm h-8 sm:h-9"
    
    switch (business.type) {
      case "order":
        return (
          <Button className={baseClasses}>
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Order
          </Button>
        )
      case "booking":
        return (
          <Button className={baseClasses}>
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Book
          </Button>
        )
      case "negotiation":
        return (
          <Button className={baseClasses}>
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Negotiate
          </Button>
        )
    }
  }

  return (
    <Card
      className={`border-0 shadow-sm hover:shadow-md transition-all duration-300 ${
        business.featured ? "ring-1 sm:ring-2 ring-yellow-400/50 shadow-yellow-100/50" : ""
      }`}
    >
      <CardContent className="p-4 sm:p-6 relative">
        {/* Featured Badge */}
        {business.featured && (
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
            <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
            <span>Featured</span>
          </div>
        )}

        <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
          <div className="relative flex-shrink-0">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
              <AvatarImage src={business.logo || "/placeholder.svg"} alt={business.name} />
              <AvatarFallback className="text-xs sm:text-sm">{business.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {business.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 bg-green-500 rounded-full p-0.5 sm:p-1">
                <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{business.name}</h3>
                  {business.verified && (
                    <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 sm:px-2">✅ Verified</Badge>
                  )}
                  {!business.verified && (
                    <Badge variant="outline" className="text-gray-500 text-xs px-1.5 py-0.5 sm:px-2">
                      Unverified
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{business.description}</p>
                {business.featured && <p className="text-xs text-yellow-600 font-medium">Trusted by Nexa</p>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(business.id)}
                className="text-gray-400 hover:text-red-500 h-8 w-8 p-0 flex-shrink-0"
              >
                <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorite ? "fill-current text-red-500" : ""}`} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            <MapPin className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
            {business.city}
          </Badge>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            {business.category}
          </Badge>
          {business.isPopular && <Badge className="bg-orange-100 text-orange-800 text-xs">Popular</Badge>}
        </div>

        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
          <div className="flex items-center space-x-0.5 sm:space-x-1">{renderStars(business.rating)}</div>
          <span className="text-xs sm:text-sm text-gray-600">({business.rating})</span>
          <span className="text-xs sm:text-sm text-gray-400">•</span>
          <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{business.price}</span>
        </div>

        <div className="flex items-center space-x-2 gap-2">
          {getActionButton()}
          <Button variant="outline" className="flex-1 text-xs sm:text-sm h-8 sm:h-9">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
