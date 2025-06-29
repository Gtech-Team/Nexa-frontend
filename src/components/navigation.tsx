"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserNav from "@/components/navigation/user-nav"
// import { useAuth } from "@/components/auth/auth-provider"

interface NavigationProps {
  activeView: "users" | "business"
  setActiveView: (view: "users" | "business") => void
}

export default function Navigation({ activeView, setActiveView }: NavigationProps) {
  return (
    <>
      <UserNav />
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 md:h-20 pl-2">
        <div className="flex items-center space-x-2 sm:space-x-3 pl-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center pl-2">
            <Image
          src="/nexa-favicon.png"
          alt="Nexa Logo"
          width={30}
          height={30}
          priority
            />
          <span className="text-lg sm:text-xl font-semibold text-white">Nexa</span>
          </div>
        </div>

        {/* Center Toggle - Hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:flex items-center bg-gray-800 rounded-full p-1">              
          <button
            onClick={() => setActiveView("users")}
            className={`px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ${
          activeView === "users" ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveView("business")}
            className={`px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
          activeView === "users" ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveView("business")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
          activeView === "business" ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Business
          </button>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-black font-medium px-3 sm:px-6 py-2 text-xs sm:text-sm">
          <span className="hidden sm:inline">
          <Link
              href={activeView === "users" ? "/find-business" : "/business-login"}
              className="block w-full h-full"
          >
              {activeView === "users" ? "Find Businesses" : "Already listed? Log in"}
          </Link>
          </span>
          <span className="sm:hidden">
          <Link
              href={activeView === "users" ? "/find-business" : "/business-login"}
              className="block w-full h-full"
          >
              {activeView === "users" ? "Find" : "Login"}
          </Link>
          </span>
          </Button>
        </div>
          </div>
        </div>
      </nav>
    </>
  )
}
