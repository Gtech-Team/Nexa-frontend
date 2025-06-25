import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function PromotionBanner() {
  return (
    <section className="mt-12 sm:mt-16 mb-6 sm:mb-8">
      <Card className="bg-gradient-to-r from-[#05BBC8]/10 to-blue-50 border border-[#05BBC8]/20">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#05BBC8] rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Want your business featured here?</h3>
          </div>
          <p className="text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Get premium visibility, verified badges, and priority placement in search results. Join thousands of
            successful businesses growing with Nexa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white px-6 sm:px-8 w-full sm:w-auto">
              Promote Your Listing
            </Button>
            <Button variant="outline" className="border-[#05BBC8] text-[#05BBC8] hover:bg-[#05BBC8]/10 w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
