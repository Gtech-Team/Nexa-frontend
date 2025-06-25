"use client"

import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeView: "users" | "business"
  setActiveView: (view: "users" | "business") => void
}

export default function Navigation({ activeView, setActiveView }: NavigationProps) {
  return (
    <nav className="relative z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#05BBC8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-semibold text-white">Nexa</span>
          </div>

          {/* Center Toggle */}
          <div className="flex items-center bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setActiveView("users")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeView === "users" ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveView("business")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeView === "business" ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Business Owners
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-black font-medium px-6">
              {activeView === "users" ? "Find Businesses" : "List Your Business "}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
