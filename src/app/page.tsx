"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Users, Star, Search, ChevronUp } from "lucide-react"

export default function HomePage() {
  const [activeView, setActiveView] = useState<"users" | "business">("users")

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
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

      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#05BBC8" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {activeView === "users" ? (
        <>
          {/* Users Hero Section */}
          <section className="relative pt-20 pb-32 px-6">
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Nigeria's
                <br />
                <span className="text-[#05BBC8]">#1 AI <span className="italic underline">local</span> </span>
                <br />
                business engine
              </h1>

              <div className="mb-16">
                <Image
                  src="/nexa-board1.png"
                  alt="AI-Powered Local Discovery Interface"
                  width={1200}
                  height={400}
                  className="max-w-4xl mx-auto rounded-2xl shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Stats */}
              <div className="relative">
                <div className="absolute -left-20 top-10 bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#05BBC8] rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">826</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-16 top-20 bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">424</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-8">Add your business to the conversation.</p>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>15,234 conversations</span>
              </div>
            </div>
          </section>

          {/* Business Categories - Users Only */}
          <section className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Explore Business Categories</h2>
                <p className="text-xl text-gray-300">Discover local businesses across Nigeria</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  { name: "Restaurants", icon: "🍽️", count: "150+" },
                  { name: "Hotels", icon: "🏨", count: "80+" },
                  { name: "Repair Shops", icon: "🔧", count: "200+" },
                  { name: "Entertainment", icon: "🎭", count: "120+" },
                  { name: "Beauty & Spa", icon: "💄", count: "95+" },
                  { name: "Fitness", icon: "💪", count: "65+" },
                  { name: "Shopping", icon: "🛍️", count: "180+" },
                  { name: "Healthcare", icon: "🏥", count: "110+" },
                ].map((category, index) => (
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

          {/* Company Logos Scroll */}
          <section className="py-8 border-t border-gray-800">
            <div className="overflow-hidden">
              <div className="flex animate-scroll space-x-12 items-center">
                {[
                  "Shoprite",
                  "Chicken Republic",
                  "Tantalizers",
                  "Mr. Biggs",
                  "Domino's Pizza",
                  "KFC",
                  "Sweet Sensation",
                  "Genesis Deluxe",
                  "Transcorp Hilton",
                  "Sheraton Hotels",
                ].map((company, index) => (
                  <div key={index} className="text-gray-500 font-medium whitespace-nowrap">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Steps */}
            <section className="py-32 px-6 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              {[
  {
    number: "1",
    title: "Discover with AI",
    description: "Find businesses that fit your style, powered by smart, preference-based AI discovery.",
  },
  {
    number: "2",
    title: "Connect instantly",
    description: "Start conversations with local vendors who match your needs in real-time, effortlessly.",
  },
  {
    number: "3",
    title: "Negotiate your way",
    description: "Agree on pricing, offers, or terms — directly inside Nexa, no middleman or delays.",
  },
  {
    number: "4",
    title: "Book and follow up",
    description: "Lock in your order, track the response, and keep things smooth from chat to checkout.",
  },
]
.map((step, index) => (
                <div
                key={index}
                className="text-center transition-transform transform hover:-translate-y-2"
                >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#05BBC8] shadow-[0_0_0_4px_rgba(5,187,200,0.15)]">
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                <div className="rounded-2xl border-2 border-[#05BBC8] bg-gray-900 p-6 shadow-lg hover:shadow-[0_4px_24px_0_rgba(5,187,200,0.25)] transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-[#05BBC8]">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
                </div>
              ))}
              </div>

              {/* Large Interface Card */}
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
            </div>
            </section>
        </>
      ) : (
        <>
          {/* Business Hero Section */}
          <section className="relative pt-20 pb-32 px-6">
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Nigeria's
                <br />
                <span className="text-[#05BBC8]">#1 AI <span className="italic underline">business</span> </span>
                <br />
                growth platform
              </h1>

              <div className="mb-16">
                <Image
                  src="/nexa-board2.png"
                  alt="AI-Powered Business Growth Interface"
                  width={1200}
                  height={400}
                  className="max-w-4xl mx-auto rounded-2xl shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Stats */}
              <div className="relative">
                <div className="absolute -left-20 top-10 bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#05BBC8] rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">1.2k</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-16 top-20 bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">850</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-8">Add your brand to the conversation.</p>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                <Users className="w-4 h-4" />
                <span>8,450 businesses growing</span>
              </div>
            </div>
          </section>

          {/* Business Process Steps */}
          <section className="py-32 px-6 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                {[
  {
    number: "1",
    title: "Launch your business",
    description: "List your services or sync existing links — Nexa builds your smart digital storefront fast.",
  },
  {
    number: "2",
    title: "Get discovered fast",
    description: "Reach nearby buyers searching for your service through Nexa’s AI-powered engine.",
  },
  {
    number: "3",
    title: "Own your brand voice",
    description: "Edit your page, set your banner, and share offers that shape how customers see you.",
  },
  {
    number: "4",
    title: "Respond and grow",
    description: "Track inquiries, pricing trends, and customer demand through Nexa-AI insights daily.",
  },
]
.map((step, index) => (
                  <div
                key={index}
                className="text-center transition-transform transform hover:-translate-y-2"
                >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#05BBC8] shadow-[0_0_0_4px_rgba(5,187,200,0.15)]">
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                <div className="rounded-2xl border-2 border-[#05BBC8] bg-gray-900 p-6 shadow-lg hover:shadow-[0_4px_24px_0_rgba(5,187,200,0.25)] transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-[#05BBC8]">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
                </div>
              ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Get Started Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-gray-800 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-left mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Get
              <br />
              Started
              <br />
              Free
            </h2>
            <p className="text-xl text-gray-300 max-w-md">
              {activeView === "users"
                ? "Find your perfect local business in under 60 seconds with the #1 AI local commerce platform."
                : "List your business in under 60 seconds to the #1 AI local commerce marketplace."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-[#05BBC8]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {activeView === "users" ? "Find directly on Nexa" : "List directly on Nexa"}
                </h3>
                <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-black font-semibold py-3">
                  {activeView === "users" ? "Search for free" : "List for free"}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[#05BBC8]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {activeView === "users" ? "Sync social or Google" : "Sync existing profiles"}
                </h3>
                <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-black font-semibold py-3">
                  Sync for free
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-800 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="text-[12rem] font-bold text-gray-800 absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
            Nexa
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-6">Power your potential™</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">IG</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">X</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">LI</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Explore Businesses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discover Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Browse Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Assistant
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Businesses</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    List a Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Growth Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Nexa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Manifesto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Join Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">2025 Nexa Group, Inc All Rights Reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-700 transition-colors">
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  )
}
