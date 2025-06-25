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
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore Business Categories</h2>
          <p className="text-xl text-gray-300">Discover local businesses across Nigeria</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-[#05BBC8] transition-all hover:scale-105 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count} businesses</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
