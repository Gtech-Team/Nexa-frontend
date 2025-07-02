"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"

export default function GoogleCallback() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // If already authenticated, redirect to find-business
    if (isAuthenticated) {
      router.push('/find-business')
      return
    }

    // Handle the OAuth callback here if needed
    // For now, just redirect to find-business
    router.push('/find-business')
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#05BBC8] mx-auto mb-4"></div>
        <p className="text-gray-600">Completing Google sign-in...</p>
      </div>
    </div>
  )
}
