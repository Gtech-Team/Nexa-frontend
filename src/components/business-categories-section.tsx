import Link from "next/link";

export default function BusinessCategoriesSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#05BBC8] to-blue-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-[#05BBC8]/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-[#05BBC8] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">Discover Local Businesses</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Business
            <span className="bg-gradient-to-r from-[#05BBC8] to-blue-600 bg-clip-text text-transparent">
              {" "}
              Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need across Nigeria&apos;s most trusted local businesses
          </p>
        </div>
        {/* Wrap categories grid in a Link */}
        <Link href="/find-business" className="block">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                name: "Restaurants",
                count: "150+",
                icon: "🍽️",
                gradient: "from-orange-400 to-red-500",
                bgGradient: "from-orange-50 to-red-50",
                description: "Local & continental cuisine",
                popular: true,
              },
              {
                name: "Hotels",
                count: "80+",
                icon: "🏨",
                gradient: "from-blue-400 to-indigo-500",
                bgGradient: "from-blue-50 to-indigo-50",
                description: "Luxury & budget stays",
              },
              {
                name: "Repair Shops",
                count: "200+",
                icon: "🔧",
                gradient: "from-gray-400 to-gray-600",
                bgGradient: "from-gray-50 to-slate-50",
                description: "Auto, electronics & more",
                trending: true,
              },
              {
                name: "Entertainment",
                count: "120+",
                icon: "🎭",
                gradient: "from-purple-400 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50",
                description: "Events, cinema & fun",
              },
              {
                name: "Beauty & Spa",
                count: "95+",
                icon: "💄",
                gradient: "from-pink-400 to-rose-500",
                bgGradient: "from-pink-50 to-rose-50",
                description: "Salons, spas & wellness",
              },
              {
                name: "Fitness",
                count: "65+",
                icon: "🏋️",
                gradient: "from-green-400 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50",
                description: "Gyms, yoga & training",
              },
              {
                name: "Shopping",
                count: "180+",
                icon: "🛍️",
                gradient: "from-yellow-400 to-orange-500",
                bgGradient: "from-yellow-50 to-orange-50",
                description: "Fashion, electronics & more",
                popular: true,
              },
              {
                name: "Healthcare",
                count: "110+",
                icon: "🏥",
                gradient: "from-teal-400 to-cyan-500",
                bgGradient: "from-teal-50 to-cyan-50",
                description: "Clinics, pharmacies & care",
              },
            ].map((category, index) => (
              <div
                key={category.name}
                className="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col space-y-1">
                  {category.popular && (
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </div>
                  )}
                  {category.trending && (
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Trending
                    </div>
                  )}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">{category.count}</span>
                    <span className="text-sm text-gray-500 group-hover:text-gray-600">businesses</span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <Link
                  href="/find-businesses"
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                  tabIndex={0}
                  aria-label={`Find businesses in ${category.name}`}
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center text-white`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Link>

        {/* Stats Bar */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">1,200+</div>
              <div className="text-sm text-gray-600">Total Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#05BBC8] mb-2">50+</div>
              <div className="text-sm text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">25K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
