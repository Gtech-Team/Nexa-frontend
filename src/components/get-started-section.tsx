import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Users } from "lucide-react"

interface GetStartedSectionProps {
  activeView: "users" | "business"
}

export default function GetStartedSection({ activeView }: GetStartedSectionProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-22 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-gray-800 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center sm:text-left mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
            Get Started Free
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-md mx-auto sm:mx-0">
            {activeView === "users"
              ? "Find your perfect local business in under 60 seconds with the #1 AI local commerce platform."
              : "List your business in under 60 seconds to the #1 AI local commerce marketplace."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Card className="bg-gray-900 border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
            <CardContent className="p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#05BBC8]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                {activeView === "users" ? "Find directly on Nexa" : "List directly on Nexa"}
              </h3>
              <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-black font-semibold py-2.5 sm:py-3 text-sm sm:text-base">
                {activeView === "users" ? "Search for free" : "List for free"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
            <CardContent className="p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#05BBC8]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                {activeView === "users" ? "Sync social or Google" : "Sync existing profiles"}
              </h3>
              <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-black font-semibold py-2.5 sm:py-3 text-sm sm:text-base">
                Sync for free
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
