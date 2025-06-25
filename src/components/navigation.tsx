"use client"

import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeView: "users" | "business"
  setActiveView: (view: "users" | "business") => void
}

export default function Navigation({ activeView, setActiveView }: NavigationProps) {
  return (
    <nav className="relative z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#05BBC8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">N</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-white">Nexa</span>
          </div>

          {/* Center Toggle - Hidden on mobile, shown on tablet+ */}
          <div className="hidden sm:flex items-center bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setActiveView("users")}
              className={`px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeView === "users" ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveView("business")}
              className={`px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeView === "business" ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="hidden md:inline">Business Owners</span>
              <span className="md:hidden">Business</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="sm:hidden flex items-center bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setActiveView("users")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeView === "users" ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveView("business")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeView === "business" ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Business
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-black font-medium px-3 sm:px-6 py-2 text-xs sm:text-sm">
              <span className="hidden sm:inline">
                <a href="/find-business" className="block w-full h-full">
                  {activeView === "users" ? "Find Businesses" : "List Your Business"}
                </a>
              </span>
              <span className="sm:hidden">
                <a href="/find-business" className="block w-full h-full">
                  {activeView === "users" ? "Find" : "List"}
                </a>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
