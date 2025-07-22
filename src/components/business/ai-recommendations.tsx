import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { AIRecommendationsProps } from "@/types/business"
import { useRouter } from "next/navigation"
import { useRef, useState, useEffect } from "react"

export default function AIRecommendations({ businesses, isLoading = false }: AIRecommendationsProps) {
  const recommendedBusinesses = businesses
    .filter((b) => b.matchScore > 85)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
  
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [showScrollHint, setShowScrollHint] = useState(true)

  // Check scroll position to show/hide navigation arrows
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollPosition()
    const element = scrollRef.current
    if (element) {
      element.addEventListener('scroll', checkScrollPosition)
      // Hide scroll hint after first interaction
      element.addEventListener('scroll', () => setShowScrollHint(false), { once: true })
      return () => {
        element.removeEventListener('scroll', checkScrollPosition)
      }
    }
  }, [recommendedBusinesses])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
      setShowScrollHint(false)
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
      setShowScrollHint(false)
    }
  }

  const handleViewBusiness = (id: string) => {
    router.push(`/business/${id}`)
    setShowScrollHint(false)
  }

  if (isLoading) {
    return (
      <section className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#05BBC8]" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recommended for You</h2>
        </div>
        <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="min-w-[250px] sm:min-w-[280px] border-0 shadow-sm animate-pulse">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mb-6 sm:mb-8">
      {/* Enhanced Header with Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#05BBC8]" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recommended for You</h2>
          <Badge variant="secondary" className="bg-[#05BBC8]/10 text-[#05BBC8] text-xs hidden sm:inline-flex">
            {recommendedBusinesses.length} matches
          </Badge>
        </div>
        
        {/* Navigation arrows - only show on larger screens */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="h-8 w-8 p-0 border-gray-200 hover:bg-gray-50 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="h-8 w-8 p-0 border-gray-200 hover:bg-gray-50 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Enhanced Scrollable Container */}
      <div className="relative">
        {/* Left fade indicator */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        )}
        
        {/* Right fade indicator */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        )}
        
        {/* Mobile scroll hint - only show if more content is available */}
        {canScrollRight && showScrollHint && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none sm:hidden">
            <div className="flex items-center gap-1 bg-[#05BBC8]/90 text-white px-2 py-1 rounded-full text-xs animate-pulse">
              <span>Swipe</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={() => setShowScrollHint(false)}
        >
          {recommendedBusinesses.map((business) => (
            <Card 
              key={business.id} 
              className="min-w-[250px] sm:min-w-[280px] border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex-shrink-0"
              onClick={() => handleViewBusiness(business.id)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-105 transition-transform">
                    <AvatarImage src={business.logo || "/placeholder.svg"} alt={business.name} />
                    <AvatarFallback className="bg-[#05BBC8]/10 text-[#05BBC8]">
                      {business.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate group-hover:text-[#05BBC8] transition-colors">
                      {business.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{business.category}</p>
                  </div>
                </div>
                <Badge
                  className="bg-[#05BBC8]/10 text-[#05BBC8] border-[#05BBC8]/20 mb-3 cursor-help text-xs"
                  title="How well this business matches your preferences and search criteria"
                >
                  Match Score: {business.matchScore}%
                </Badge>
                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm group-hover:bg-[#05BBC8] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewBusiness(business.id)
                  }}
                >
                  View Business
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
