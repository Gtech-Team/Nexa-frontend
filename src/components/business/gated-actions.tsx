"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { Heart, MessageSquare, Calendar, ShoppingCart, Star, DollarSign } from "lucide-react"

interface GatedActionButtonProps {
  action: "save" | "negotiate" | "book" | "order" | "review" | "message"
  businessName: string
  businessId: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
}

export default function GatedActionButton({
  action,
  businessName,
  businessId,
  variant = "default",
  size = "default",
  className = "",
  children,
}: GatedActionButtonProps) {
  const { isAuthenticated, showAuthModal } = useAuth()

  const actionConfig = {
    save: {
      icon: Heart,
      label: "Save Business",
      color: "text-red-500",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
    negotiate: {
      icon: DollarSign,
      label: "Negotiate Price",
      color: "text-green-500",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
    book: {
      icon: Calendar,
      label: "Book Appointment",
      color: "text-blue-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    order: {
      icon: ShoppingCart,
      label: "Order Now",
      color: "text-purple-500",
      bgColor: "bg-purple-50 hover:bg-purple-100",
    },
    review: {
      icon: Star,
      label: "Leave Review",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 hover:bg-yellow-100",
    },
    message: {
      icon: MessageSquare,
      label: "Message Vendor",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
    },
  }

  const config = actionConfig[action]
  const Icon = config.icon

  const handleClick = () => {
    if (!isAuthenticated) {
      showAuthModal(action, businessName)
      return
    }

    // Handle authenticated action
    console.log(`Performing ${action} for business ${businessId}`)

    // Here you would implement the actual action logic
    switch (action) {
      case "save":
        // Add to favorites
        break
      case "negotiate":
        // Open negotiation modal
        break
      case "book":
        // Open booking modal
        break
      case "order":
        // Add to cart or open order modal
        break
      case "review":
        // Open review modal
        break
      case "message":
        // Open chat interface
        break
    }
  }

  if (children) {
    return (
      <Button onClick={handleClick} variant={variant} size={size} className={className}>
        {children}
      </Button>
    )
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`${className} ${variant === "outline" ? config.bgColor : ""}`}
    >
      <Icon className={`w-4 h-4 mr-2 ${variant === "outline" ? config.color : ""}`} />
      {config.label}
    </Button>
  )
}
