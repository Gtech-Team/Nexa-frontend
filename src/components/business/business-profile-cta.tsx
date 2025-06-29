"use client"

import { Button } from "@/components/ui/button"
import { Business } from "@/types/business"
import { Calendar, ShoppingCart, MessageCircle, Heart, Share2 } from "lucide-react"

interface BusinessProfileCTAProps {
  business: Business
  onActionClick: (action: 'booking' | 'order' | 'negotiation') => void
}

export default function BusinessProfileCTA({ business, onActionClick }: BusinessProfileCTAProps) {
  const getPrimaryAction = () => {
    const baseClasses = "flex-1 h-12 font-medium"
    
    switch (business.type) {
      case "order":
        return (
          <Button 
            className={`${baseClasses} bg-[#05BBC8] hover:bg-[#049aa5] text-white`}
            onClick={() => onActionClick('order')}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Order Now
          </Button>
        )
      case "booking":
        return (
          <Button 
            className={`${baseClasses} bg-[#05BBC8] hover:bg-[#049aa5] text-white`}
            onClick={() => onActionClick('booking')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Button>
        )
      case "negotiation":
        return (
          <Button 
            className={`${baseClasses} bg-[#05BBC8] hover:bg-[#049aa5] text-white`}
            onClick={() => onActionClick('negotiation')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Negotiate
          </Button>
        )
    }
  }

  return (
    <>
      {/* Desktop CTA - Hidden on mobile */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-xl shadow-lg border p-4 space-y-3">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{business.name}</div>
            <div className="text-sm text-[#05BBC8] font-medium">{business.price}</div>
          </div>
          <div className="flex space-x-2">
            {getPrimaryAction()}
            <Button
              variant="outline"
              size="sm"
              className="h-12 px-4"
              onClick={() => onActionClick('negotiation')}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            {getPrimaryAction()}
            
            <Button
              variant="outline"
              className="h-12 px-4"
              onClick={() => onActionClick('negotiation')}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              className="h-12 px-4"
            >
              <Heart className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              className="h-12 px-4"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {/* Add padding to account for the fixed CTA */}
        <div className="h-16"></div>
      </div>
      
      {/* Mobile padding spacer */}
      <div className="sm:hidden h-20"></div>
    </>
  )
}
