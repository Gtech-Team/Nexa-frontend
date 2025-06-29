"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { mockBusinesses } from "@/data/mockData"
import { Business } from "@/types/business"
import  BusinessProfileHero  from "@/components/business/business-profile-hero"
import BusinessProfileTabs from "@/components/business/business-profile-tabs"
import BusinessProfileCTA from "@/components/business/business-profile-cta"
import BookingModal from "@/components/business/booking-modal"
import OrderModal from "@/components/business/order-modal"
import NegotiationModal from "@/components/business/negotiation-modal"

export default function BusinessProfilePage() {
  const { id } = useParams()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeModal, setActiveModal] = useState<'booking' | 'order' | 'negotiation' | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedService, setSelectedService] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundBusiness = mockBusinesses.find(b => b.id === id)
    setBusiness(foundBusiness || null)
    setLoading(false)
  }, [id])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleActionClick = (action: 'booking' | 'order' | 'negotiation', service?: any) => {
    setSelectedService(service)
    setActiveModal(action)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedService(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#05BBC8]"></div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Business Not Found</h1>
          <p className="text-gray-600">The business you&#39;re looking for doesn&#39;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-6 py-4">
        <BusinessProfileHero business={business} />
        <BusinessProfileTabs business={business} onActionClick={handleActionClick} />
        <BusinessProfileCTA business={business} onActionClick={handleActionClick} />
      </div>

      {/* Modals */}
      {activeModal === 'booking' && (
        <BookingModal
          isOpen={true}
          onClose={closeModal}
          business={business}
          service={selectedService}
        />
      )}

      {activeModal === 'order' && (
        <OrderModal
          isOpen={true}
          onClose={closeModal}
          business={business}
          product={selectedService}
        />
      )}

      {activeModal === 'negotiation' && (
        <NegotiationModal
          isOpen={true}
          onClose={closeModal}
          business={business}
          item={selectedService}
        />
      )}
    </div>
  )
}
