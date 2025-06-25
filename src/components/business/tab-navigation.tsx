import { TabType, TabNavigationProps } from "@/types/business"

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "featured" as TabType, label: "⭐ Featured", description: "Verified and promoted businesses" },
    { id: "all" as TabType, label: "All Businesses", description: "Complete directory" },
    { id: "nearby" as TabType, label: "📍 Near You", description: "Location-based results" },
  ]

  return (
    <section className="mb-6 sm:mb-8">
      <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border border-gray-200 w-full sm:w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id
                ? "bg-[#05BBC8] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
            title={tab.description}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  )
}
