import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function UsersInterfaceCard() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Card className="bg-white text-black rounded-2xl shadow-2xl max-w-lg border-2 border-[#05BBC8] hover:shadow-[0_8px_32px_0_rgba(5,187,200,0.15)] transition-all duration-300">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6 text-[#05BBC8]">What are the best restaurants in Owerri?</h3>

            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4"># People also ask</div>

              <div className="space-y-3">
                <div className="text-sm text-gray-700">What unique cuisines are available in Owerri?</div>
                <div className="text-sm text-gray-700">
                  What are the key features local restaurants offer?
                </div>
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-[#05BBC8]">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">TC</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Tantalizers</div>
                    <div className="text-sm text-gray-600">Owerri, NG</div>
                    <div className="text-sm text-gray-600">
                      Creating delicious meals where anyone can belong anywhere.
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📍 HQ: Owerri</span>
                    <span>📅 Founded: 1995</span>
                    <span>👥 Size: 100 - 150</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-[#05BBC8]">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-red-500 rounded"></div>
                      <span className="text-sm">Tantalizers</span>
                    </div>
                    <div className="text-sm text-gray-600">₦2000 - ₦5000 • Match Score: 95%</div>
                  </div>

                  <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-black mt-2 border-2 border-[#05BBC8] shadow-sm hover:shadow-[0_2px_8px_0_rgba(5,187,200,0.15)] transition-all">
                    View Restaurant
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 pl-16">
        <div className="flex items-center space-x-3 mb-6">
          <Star className="w-8 h-8 text-[#05BBC8]" />
        </div>
        <h2 className="text-4xl font-bold mb-6">Get discovered through conversations</h2>
        <p className="text-xl text-gray-300 leading-relaxed">
          Attract AI fluent businesses with the highest intention, aligned with your preferences & budget - 
          elevating your local commerce success through conversations not clicks.
        </p>
      </div>
    </div>
  )
}
