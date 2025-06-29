"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Business } from "@/types/business"
import { MessageCircle, TrendingUp, X, Send, Lightbulb } from "lucide-react"

interface Item {
  id: string
  name: string
  description?: string
  price: string
  rating?: number
  category?: string
}

interface NegotiationModalProps {
  isOpen: boolean
  onClose: () => void
  business: Business
  item?: Item
}

export default function NegotiationModal({ isOpen, onClose, business, item }: NegotiationModalProps) {
  const [offerPrice, setOfferPrice] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const selectedItem = item || {
    id: "general",
    name: "General Inquiry",
    price: business.price,
    description: "Negotiate pricing for services"
  }

  const originalPrice = parseInt(selectedItem.price.replace(/[^0-9]/g, ''))
  const suggestedPrice = Math.floor(originalPrice * 0.8)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    onClose()
    alert("Your offer has been sent! The business will respond within 24 hours.")
  }

  const handleQuickOffer = (percentage: number) => {
    const quickOfferPrice = Math.floor(originalPrice * (percentage / 100))
    setOfferPrice(quickOfferPrice.toString())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white border shadow-xl rounded-2xl p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-[#05BBC8]" />
              Negotiate Price
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-1">{selectedItem.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{selectedItem.description}</p>
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-gray-600">Current Price:</span>
                <span className="ml-2 font-semibold text-[#05BBC8]">{selectedItem.price}</span>
              </div>
              <div className="text-right text-gray-500">
                <div>From {business.name}</div>
                <div className="text-xs">{business.city}</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Smart Tip</h4>
                <p className="text-sm text-blue-800">
                  Customers typically succeed around <span className="font-semibold">₦{suggestedPrice.toLocaleString()}</span> (20% off).
                  Start here for better success.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Offers</label>
              <div className="grid grid-cols-3 gap-2">
                {[30, 20, 10].map((discount) => {
                  const perc = 100 - discount;
                  return (
                    <Button
                      key={discount}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={`flex flex-col h-auto py-3 ${discount === 20 ? 'border-[#05BBC8] bg-[#05BBC8]/5' : ''}`}
                      onClick={() => handleQuickOffer(perc)}
                    >
                      {discount === 20 && (
                        <Badge className="bg-green-100 text-green-800 text-xs mb-1">Recommended</Badge>
                      )}
                      <span className="text-xs text-gray-600">{discount}% off</span>
                      <span className="font-semibold text-[#05BBC8]">
                        ₦{Math.floor(originalPrice * (perc / 100)).toLocaleString()}
                      </span>
                    </Button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Your Offer Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                <Input
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="Enter your offer amount"
                  className="pl-8"
                  min="1"
                  max={originalPrice}
                  required
                />
              </div>
              {offerPrice && parseInt(offerPrice) > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Your offer is <span className={`font-medium ${
                    parseInt(offerPrice) < originalPrice * 0.5 ? 'text-red-600'
                    : parseInt(offerPrice) < originalPrice * 0.8 ? 'text-green-600'
                    : 'text-yellow-600'
                  }`}>
                    {(((originalPrice - parseInt(offerPrice)) / originalPrice) * 100).toFixed(0)}% below
                  </span> the listed price
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Add a Message (Optional)</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain your reasoning, mention bulk order or loyalty..."
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Mentioning bulk orders, flexible dates, or repeat business can help your offer!
              </p>
            </div>

            {offerPrice && parseInt(offerPrice) > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 font-medium">Success Probability</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-600">
                      {parseInt(offerPrice) >= originalPrice * 0.8 ? 'High'
                      : parseInt(offerPrice) >= originalPrice * 0.6 ? 'Medium'
                      : 'Low'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      parseInt(offerPrice) >= originalPrice * 0.8 ? 'bg-green-500 w-4/5'
                      : parseInt(offerPrice) >= originalPrice * 0.6 ? 'bg-yellow-500 w-3/5'
                      : 'bg-red-500 w-2/5'
                    }`}
                  ></div>
                </div>
              </div>
            )}

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
                disabled={!offerPrice || parseInt(offerPrice) <= 0 || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Offer
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="text-xs text-gray-500 text-center border-t pt-4">
            Your offer will be sent to {business.name}. Expect a response within 24 hours.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
