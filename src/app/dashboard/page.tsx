"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

export default function DashboardRouter() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to home if not authenticated
        router.push('/')
        return
      }

      // Route based on user role
      if (user?.role === 'business') {
        router.push('/dashboard/business')
      } else {
        // Default to user dashboard for regular users
        router.push('/dashboard/user')
      }
    }
  }, [user, isAuthenticated, isLoading, router])

  // Show loading spinner while determining route
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#05BBC8] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return null
}
