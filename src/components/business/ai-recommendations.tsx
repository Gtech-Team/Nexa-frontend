import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { AIRecommendationsProps } from "@/types/business"
import { useRouter } from "next/navigation"

export default function AIRecommendations({ businesses, isLoading = false }: AIRecommendationsProps) {
  const recommendedBusinesses = businesses
    .filter((b) => b.matchScore > 85)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
    const router = useRouter()

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
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#05BBC8]" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recommended for You</h2>
      </div>
      <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4">
        {recommendedBusinesses.map((business) => (
          <Card key={business.id} className="min-w-[250px] sm:min-w-[280px] border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage src={business.logo || "/placeholder.svg"} alt={business.name} />
                  <AvatarFallback>{business.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{business.name}</h3>
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
                className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm"
                onClick={() => {
                  router.push(`/business/${business.id}`);
                }}
                >
                View Business
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
