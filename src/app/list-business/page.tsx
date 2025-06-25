"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Calendar,
  BarChart3,
  Globe,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import Footer from "@/components/footer"
import PageHeader from "@/components/business/page-header"

const testimonials = [
  {
    stars: 5,
    quote:
      'Since joining Nexa, our restaurant has seen a 200% increase in online orders. The AI recommendations bring us customers we never would have reached before. The dashboard makes everything so easy to manage!',
    initials: "CK",
    avatarColor: "bg-red-500",
    name: "Chika Okafor",
    role: "Owner, Chicken King Restaurant, Owerri",
  },
  {
    stars: 5,
    quote:
      "Nexa gave my salon a professional online presence in minutes. Bookings are up, and my clients love the easy scheduling. Highly recommend for any business owner!",
    initials: "AM",
    avatarColor: "bg-pink-600",
    name: "Amaka Madu",
    role: "Founder, Glamour Touch Salon, Enugu",
  },
  {
    stars: 5,
    quote:
      "The analytics dashboard is a game changer. I can see exactly where my customers come from and what services are most popular. Nexa helped me double my monthly revenue.",
    initials: "TO",
    avatarColor: "bg-blue-600",
    name: "Tunde Oladipo",
    role: "CEO, Tunde Tech Repairs, Lagos",
  },
  {
    stars: 5,
    quote:
      "I never thought getting my business online could be this easy. Nexa’s support team is fantastic, and my bookings have never been better!",
    initials: "FA",
    avatarColor: "bg-green-600",
    name: "Fatima Abdullahi",
    role: "Owner, Fatima Spa & Wellness, Abuja",
  },
]

function TestimonialSlider() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <div>
      <Card className="bg-gray-900 border border-gray-700 relative">
        <CardContent className="p-8">
          <div className="flex items-center space-x-1 mb-4 justify-center">
            {[...Array(testimonials[index].stars)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-xl text-center text-gray-300 mb-6 italic">
            &quot;{testimonials[index].quote}&quot;
          </blockquote>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3">
              <div className={`w-12 h-12 ${testimonials[index].avatarColor} rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{testimonials[index].initials}</span>
              </div>
              <div>
                <div className="font-semibold text-white">{testimonials[index].name}</div>
                <div className="text-sm text-gray-400">{testimonials[index].role}</div>
              </div>
            </div>
          </div>
        </CardContent>
        <button
          aria-label="Previous testimonial"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-gray-300"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          aria-label="Next testimonial"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-gray-300"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-[#05BBC8]" : "bg-gray-600"}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default function ListBusinessPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    setIsLoading(true)
    // Simulate navigation to onboarding flow
    setTimeout(() => {
      alert("This would redirect to the business registration flow!")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
        {/* Header */}
            <PageHeader
              title="Find a Business"
              favoritesCount={0}
                variant="black"
            />
      

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <pattern id="business-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#05BBC8" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#business-grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <Badge className="bg-[#05BBC8]/20 text-[#05BBC8] border-[#05BBC8]/30 mb-6">For Business Owners</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Bring Your Business
              <br />
              <span className="text-[#05BBC8]">Online with Nexa</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect with local customers, manage orders/bookings, and grow your revenue with AI-powered tools — all from one
              simple dashboard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Button
              onClick={handleGetStarted}
              disabled={isLoading}
              className="bg-[#05BBC8] hover:bg-[#049aa5] text-black font-semibold px-12 py-4 text-lg rounded-xl"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Getting Started...</span>
                </div>
              ) : (
                <>
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </div>

          <p className="text-gray-400 text-sm">
            Already listed?{" "}
            <Link href="/business-login" className="text-[#05BBC8] hover:underline">
              Log in to your dashboard
            </Link>
          </p>

          {/* Hero Image/Mockup */}
          <div className="mt-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                <div className="bg-white rounded-xl p-6 text-black">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-[#05BBC8] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">TC</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Tantalizers Restaurant</h3>
                      <p className="text-gray-600">Owerri, Nigeria</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 ml-auto">✅ Verified</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#05BBC8]">150+</div>
                      <div className="text-sm text-gray-600">Monthly Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#05BBC8]">4.8★</div>
                      <div className="text-sm text-gray-600">Customer Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#05BBC8]">₦2.5M</div>
                      <div className="text-sm text-gray-600">Monthly Revenue</div>
                    </div>
                  </div>
                  <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-white">View Full Dashboard</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why List on Nexa */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why List on Nexa?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join Nigeria&#39;s fastest-growing local commerce platform and unlock powerful tools to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8 text-[#05BBC8]" />,
                title: "AI-Powered Discovery",
                description: "Nexa helps people find your business faster using smart AI recommendations and search.",
                highlight: "3x more visibility",
              },
              {
                icon: <Calendar className="w-8 h-8 text-[#05BBC8]" />,
                title: "Seamless Bookings",
                description: "Customers can book appointments or place orders directly through your profile.",
                highlight: "Automated scheduling",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-[#05BBC8]" />,
                title: "Insights Dashboard",
                description: "See how customers interact with your business and track your growth metrics.",
                highlight: "Real-time analytics",
              },
              {
                icon: <Globe className="w-8 h-8 text-[#05BBC8]" />,
                title: "Free Landing Page",
                description: "Get your own Nexa-powered website and online presence. No coding required.",
                highlight: "Professional website",
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-gray-900 border border-gray-700 p-6 flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-3">{feature.description}</p>
                <span className="text-[#05BBC8] font-medium text-sm">{feature.highlight}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <TestimonialSlider />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-gray-800 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Grow
            <br />
            <span className="text-[#05BBC8]">Your Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            List your business today — it&#39;s free to get started. Join thousands of successful businesses already growing
            with Nexa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Button
              onClick={handleGetStarted}
              disabled={isLoading}
              className="bg-[#05BBC8] hover:bg-[#049aa5] text-black font-semibold px-12 py-4 text-lg rounded-xl"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Profile...</span>
                </div>
              ) : (
                <>
                  Create My Profile Now
                  <TrendingUp className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
              Talk to Sales
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
           <Footer />
    </div>
  )
}
