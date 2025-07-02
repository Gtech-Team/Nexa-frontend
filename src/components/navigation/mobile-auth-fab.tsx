"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { User } from "lucide-react"

export default function MobileAuthFAB() {
  const { isAuthenticated, showAuthModal } = useAuth()

  if (isAuthenticated) {
    return null
  }

  return (
    <Button
      onClick={() => showAuthModal()}
      className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-[#05BBC8] hover:bg-[#049aa5] text-white shadow-lg z-50"
    >
      <User className="w-6 h-6" />
    </Button>
  )
}
