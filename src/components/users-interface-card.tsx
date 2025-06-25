import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function UsersInterfaceCard() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16">
      <div className="flex-1 w-full">
        <Card className="bg-white text-black rounded-xl sm:rounded-2xl shadow-2xl max-w-full lg:max-w-lg border-2 border-[#05BBC8] hover:shadow-[0_8px_32px_0_rgba(5,187,200,0.15)] transition-all duration-300">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#05BBC8]">What are the best restaurants in Owerri?</h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4"># People also ask</div>

              <div className="space-y-2 sm:space-y-3">
                <div className="text-xs sm:text-sm text-gray-700">What unique cuisines are available in Owerri?</div>
                <div className="text-xs sm:text-sm text-gray-700">
                  What are the key features local restaurants offer?
                </div>
              </div>

              <div className="border-t pt-3 sm:pt-4 mt-4 sm:mt-6">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-[#05BBC8]">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">TC</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base">Tantalizers</div>
                    <div className="text-xs sm:text-sm text-gray-600">Owerri, NG</div>                    <div className="text-xs sm:text-sm text-gray-600 truncate">
                      Creating delicious meals where anyone can belong anywhere.
                    </div>
                  </div>
                </div>

                <div className="mt-2 sm:mt-3 overflow-x-auto">
                  <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                    <span>📍 HQ: Owerri</span>
                    <span>📅 Founded: 1995</span>
                    <span className="hidden sm:inline">👥 Size: 100 - 150</span>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-[#05BBC8]">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm font-medium">Tantalizers</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 text-right">
                      <div>₦2000 - ₦5000</div>
                      <div className="hidden sm:block">Match Score: 95%</div>
                    </div>
                  </div>

                  <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-black mt-2 border-2 border-[#05BBC8] shadow-sm hover:shadow-[0_2px_8px_0_rgba(5,187,200,0.15)] transition-all text-sm sm:text-base py-2 sm:py-3">
                    View Restaurant
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 lg:pl-8 xl:pl-16 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4 sm:mb-6">
          <Star className="w-6 h-6 sm:w-8 sm:h-8 text-[#05BBC8]" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Get discovered through conversations</h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
          Attract AI fluent businesses with the highest intention, aligned with your preferences & budget - 
          elevating your local commerce success through conversations not clicks.
        </p>
      </div>
    </div>
  )
}
