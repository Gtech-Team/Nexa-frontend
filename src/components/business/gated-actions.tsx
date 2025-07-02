"use client"

import { Button } from "@/components/ui/button"
import { useAuth, useModal, useApp } from '@/store'
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  ShoppingCart, 
  Star,
  Phone,
  Share2,
  HandCoins
} from "lucide-react"
import { cn } from '@/lib/utils'

type ActionType = 'save' | 'message' | 'book' | 'order' | 'review' | 'call' | 'share' | 'negotiate'

interface GatedActionsProps {
  businessId: string
  businessName: string
  businessPhone?: string
  actions: ActionType[]
  variant?: 'default' | 'compact' | 'floating'
  className?: string
}

interface ActionConfig {
  icon: React.ComponentType<{ className?: string }>
  label: string
  requiresAuth: boolean
  action: (businessId: string, businessName: string) => void
  variant?: 'default' | 'outline' | 'secondary'
  color?: string
}

export default function GatedActions({ 
  businessId, 
  businessName, 
  businessPhone,
  actions, 
  variant = 'default',
  className 
}: GatedActionsProps) {
  const { isAuthenticated } = useAuth()
  const { openBookingModal, openNegotiationModal, openAuthModal } = useModal()
  const { addToFavorites, removeFromFavorites, favoriteBusinesses } = useApp()
  const isFavorite = favoriteBusinesses.includes(businessId)

  const handleSave = () => {
    if (isFavorite) {
      removeFromFavorites(businessId)
    } else {
      addToFavorites(businessId)
    }
  }

  const handleMessage = () => {
    // Open messaging interface
    console.log('Opening message interface for:', businessName)
  }

  const handleBook = () => {
    openBookingModal(businessId)
  }

  const handleOrder = () => {
    // Open order interface or add to cart
    console.log('Opening order interface for:', businessName)
  }

  const handleReview = () => {
    // Open review interface
    console.log('Opening review interface for:', businessName)
  }

  const handleCall = () => {
    if (businessPhone) {
      window.open(`tel:${businessPhone}`, '_self')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: businessName,
        text: `Check out ${businessName} on Nexa`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleNegotiate = () => {
    openNegotiationModal(businessId)
  }

  const actionConfigs: Record<ActionType, ActionConfig> = {
    save: {
      icon: Heart,
      label: isFavorite ? 'Saved' : 'Save',
      requiresAuth: true,
      action: handleSave,
      variant: isFavorite ? 'default' : 'outline',
      color: isFavorite ? 'text-red-500' : 'text-gray-500'
    },
    message: {
      icon: MessageCircle,
      label: 'Message',
      requiresAuth: true,
      action: handleMessage,
      variant: 'outline'
    },
    book: {
      icon: Calendar,
      label: 'Book',
      requiresAuth: true,
      action: handleBook,
      variant: 'default'
    },
    order: {
      icon: ShoppingCart,
      label: 'Order',
      requiresAuth: true,
      action: handleOrder,
      variant: 'default'
    },
    review: {
      icon: Star,
      label: 'Review',
      requiresAuth: true,
      action: handleReview,
      variant: 'outline'
    },
    call: {
      icon: Phone,
      label: 'Call',
      requiresAuth: false,
      action: handleCall,
      variant: 'outline'
    },
    share: {
      icon: Share2,
      label: 'Share',
      requiresAuth: false,
      action: handleShare,
      variant: 'outline'
    },
    negotiate: {
      icon: HandCoins,
      label: 'Negotiate',
      requiresAuth: true,
      action: handleNegotiate,
      variant: 'secondary'
    }
  }

  const handleActionClick = (actionType: ActionType) => {
    const config = actionConfigs[actionType]
    
    if (config.requiresAuth && !isAuthenticated) {
      openAuthModal('login', undefined, actionType)
      return
    }
    
    config.action(businessId, businessName)
  }

  const getButtonSize = () => {
    switch (variant) {
      case 'compact':
        return 'sm'
      case 'floating':
        return 'lg'
      default:
        return 'default'
    }
  }

  const getContainerClassName = () => {
    switch (variant) {
      case 'compact':
        return 'flex items-center space-x-2'
      case 'floating':
        return 'fixed bottom-6 right-6 flex flex-col space-y-2 z-50'
      default:
        return 'flex items-center space-x-3'
    }
  }

  return (
    <div className={cn(getContainerClassName(), className)}>
      {actions.map((actionType) => {
        const config = actionConfigs[actionType]
        const Icon = config.icon
        
        return (
          <Button
            key={actionType}
            variant={config.variant}
            size={getButtonSize()}
            onClick={() => handleActionClick(actionType)}
            className={cn(
              'transition-all duration-200',
              config.color && config.color,
              variant === 'floating' && 'shadow-lg hover:shadow-xl',
              variant === 'compact' && 'h-8 px-3 text-sm',
              actionType === 'save' && isFavorite && 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
            )}
          >
            <Icon className={cn(
              variant === 'compact' ? 'w-3 h-3' : 'w-4 h-4',
              variant !== 'compact' && 'mr-2'
            )} />
            {variant !== 'compact' && config.label}
          </Button>
        )
      })}
    </div>
  )
}

// Preset action groups for common use cases
export const BusinessCardActions = ({ businessId, businessName, businessPhone }: { 
  businessId: string
  businessName: string
  businessPhone?: string 
}) => (
  <GatedActions
    businessId={businessId}
    businessName={businessName}
    businessPhone={businessPhone}
    actions={['save', 'message', 'call', 'share']}
    variant="compact"
  />
)

export const BusinessProfileActions = ({ businessId, businessName, businessPhone }: { 
  businessId: string
  businessName: string
  businessPhone?: string 
}) => (
  <GatedActions
    businessId={businessId}
    businessName={businessName}
    businessPhone={businessPhone}
    actions={['save', 'book', 'order', 'message', 'negotiate']}
  />
)

export const FloatingActions = ({ businessId, businessName }: { 
  businessId: string
  businessName: string 
}) => (
  <GatedActions
    businessId={businessId}
    businessName={businessName}
    actions={['save', 'book', 'message']}
    variant="floating"
    className="md:hidden"
  />
)
