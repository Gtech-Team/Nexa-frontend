"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Business, Service } from "@/types/business"
import { Calendar, Clock, User, CreditCard } from "lucide-react"

const useAuth = () => ({
  isAuthenticated: false,
  openAuthModal: () => alert("Please log in to continue with booking")
})

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  business: Business
  service?: Service
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
]

export default function BookingModal({ isOpen, onClose, business, service }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, openAuthModal } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    onClose()
    alert("Booking confirmed! You'll receive a confirmation shortly.")
  }

  const selectedService = service || {
    id: "default",
    name: "General Service",
    price: "₦2000 - ₦10,000",
    duration: "60 mins",
    description: "Standard service booking"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white border shadow-xl rounded-2xl p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-800">Book Service</DialogTitle>
            
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-1">{selectedService.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{selectedService.description}</p>
            <div className="flex justify-between text-sm">
              <div className="flex space-x-4">
                <Badge variant="outline">
                  <Clock className="w-4 h-4 mr-1" />{selectedService.duration}
                </Badge>
                <span className="text-[#05BBC8] font-semibold">{selectedService.price}</span>
              </div>
              <div className="text-right text-gray-500">
                <div>At {business.name}</div>
                <div className="text-xs">{business.city}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 flex items-center mb-3">
                <User className="w-4 h-4 mr-2" />Your Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name"
                  required
                />
                <Input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2" />Select Date & Time
              </h4>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              {selectedDate && (
                <div className="mt-4">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        className={`text-xs ${selectedTime === time ? "bg-[#05BBC8] hover:bg-[#049aa5]" : ""}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Special Requests (Optional)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests or notes for the provider..."
                rows={3}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Service Fee:</span>
                <span className="font-medium">{selectedService.price}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Platform Fee:</span>
                <span className="font-medium">₦500</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-[#05BBC8]">
                  ₦{parseInt(selectedService.price.replace(/[^0-9]/g, "")) + 500}
                </span>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#05BBC8] hover:bg-[#049aa5] text-white"
                disabled={!selectedDate || !selectedTime || !customerName || !customerPhone || isLoading}
                onClick={() => {
                  if (!isAuthenticated) {
                    openAuthModal()
                    return
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />Confirm Booking
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
