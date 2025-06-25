import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Restaurants", icon: "🍽️", count: "150+" },
  { name: "Hotels", icon: "🏨", count: "80+" },
  { name: "Repair Shops", icon: "🔧", count: "200+" },
  { name: "Entertainment", icon: "🎭", count: "120+" },
  { name: "Beauty & Spa", icon: "💄", count: "95+" },
  { name: "Fitness", icon: "💪", count: "65+" },
  { name: "Shopping", icon: "🛍️", count: "180+" },
  { name: "Healthcare", icon: "🏥", count: "110+" },
]

export default function BusinessCategoriesSection() {
  return (
<section className="pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 relative">
       <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Explore Business Categories</h2>
          <p className="text-lg sm:text-xl text-gray-300">Discover local businesses across Nigeria</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#05BBC8] transition-all hover:scale-105 cursor-pointer group"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">{category.name}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{category.count} businesses</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
