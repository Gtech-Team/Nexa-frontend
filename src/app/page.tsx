"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import BackgroundPattern from "@/components/background-pattern"
import UsersHeroSection from "@/components/users-hero-section"
// import BusinessHeroSection from "@/components/business-hero-section"
import BusinessCategoriesSection from "@/components/business-categories-section"
import CompanyLogosSection from "@/components/company-logos-section"
import ProcessSteps from "@/components/process-steps"
import UsersInterfaceCard from "@/components/users-interface-card"
import GetStartedSection from "@/components/get-started-section"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import UserNav from "@/components/navigation/user-nav"
import MobileAuthFAB from "@/components/navigation/mobile-auth-fab"
import ListBusinessPage from "@/app/list-business/page"

export default function HomePage() {
  const [activeView, setActiveView] = useState<"users" | "business">("users")

  const usersSteps = [
    {
      number: "1",
      title: "Discover with AI",
      description: "Find businesses that fit your style, powered by smart, preference-based discovery.",
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


  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <UserNav />
      <Navigation activeView={activeView} setActiveView={setActiveView} />

      {/* Geometric Background Pattern */}
      <BackgroundPattern />

      {activeView === "users" ? (
        <>
          {/* Users Hero Section */}
          <UsersHeroSection />

          {/* Business Categories - Users Only */}
          <BusinessCategoriesSection />

          {/* Company Logos Scroll */}
          <CompanyLogosSection />
          
          {/* Process Steps */}
          <section className="py-24 sm:py-28 lg:py-32 px-4 sm:px-6 relative">
            <div className="max-w-7xl mx-auto">
              <ProcessSteps steps={usersSteps} />

              {/* Large Interface Card */}
              <UsersInterfaceCard />
            </div>
          </section>
          
          {/* Get Started Section */}
          <GetStartedSection />

          {/* Footer */}
          <Footer />
        </>
      ) : (
        <>
          <ListBusinessPage />
        </>
      )}

      {/* Mobile Auth FAB for non-authenticated users */}
      <MobileAuthFAB />

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  )
}
