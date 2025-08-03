import { LucideIcon } from 'lucide-react'

export interface Tab {
  id: string
  label: string
  icon?: LucideIcon
}

export interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export default function TabNavigation({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className = "" 
}: TabNavigationProps) {
  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border border-gray-200 w-full overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer flex items-center space-x-1 sm:space-x-2 ${
              activeTab === tab.id
                ? "bg-[#05BBC8] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab.icon && <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
