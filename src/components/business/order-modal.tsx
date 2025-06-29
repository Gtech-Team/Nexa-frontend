"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Business, Product } from "@/types/business"
import {
  Truck,
  MapPin,
  Plus,
  Minus,
  CreditCard
} from "lucide-react"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  business: Business
  product?: Product
}

const deliveryOptions = [
  { id: "pickup", name: "Store Pickup", price: 0, time: "Ready in 30 mins" },
  { id: "standard", name: "Standard Delivery", price: 1500, time: "2-3 hours" },
  { id: "express", name: "Express Delivery", price: 3000, time: "30-60 mins" }
]

const productVariants = [
  { id: "small", name: "Small", available: true },
  { id: "medium", name: "Medium", available: true },
  { id: "large", name: "Large", available: false }
]

export default function OrderModal({ isOpen, onClose, business, product }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState("medium")
  const [selectedDelivery, setSelectedDelivery] = useState("pickup")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const selectedProduct = product || {
    id: "default",
    name: "Product",
    price: business.price,
    description: "Premium product from " + business.name,
    rating: business.rating,
    category: business.category
  }

  const basePrice = parseInt(selectedProduct.price.replace(/[^0-9]/g, "")) || 0
  const deliveryFee = deliveryOptions.find(opt => opt.id === selectedDelivery)?.price || 0
  const platformFee = 500
  const subtotal = basePrice * quantity
  const total = subtotal + deliveryFee + platformFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    onClose()
    alert("Order placed successfully! You'll receive a confirmation shortly.")
  }

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white border shadow-xl rounded-2xl p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-800">Place Order</DialogTitle>
          
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-1">{selectedProduct.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{selectedProduct.description}</p>
            <div className="flex justify-between text-sm">
              <span className="text-[#05BBC8] font-semibold">{selectedProduct.price}</span>
              <div className="text-right text-gray-500">
                <div>From {business.name}</div>
                <div className="text-xs">{business.city}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Product Options</h4>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Size</label>
                <div className="flex space-x-2">
                  {productVariants.map((variant) => (
                    <Button
                      key={variant.id}
                      type="button"
                      variant={selectedVariant === variant.id ? "default" : "outline"}
                      size="sm"
                      className={`text-sm ${selectedVariant === variant.id ? "bg-[#05BBC8] hover:bg-[#049aa5] text-white" : ""}`}
                      onClick={() => setSelectedVariant(variant.id)}
                      disabled={!variant.available}
                    >
                      {variant.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button type="button" variant="outline" size="sm" onClick={() => updateQuantity(-1)} disabled={quantity <= 1}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-medium text-lg px-4">{quantity}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => updateQuantity(1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-800 flex items-center">
                <Truck className="w-4 h-4 mr-2" />Delivery Options
              </h4>
              <div className="space-y-2">
                {deliveryOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${selectedDelivery === option.id ? "border-[#05BBC8] bg-[#05BBC8]/5" : "border-gray-200 hover:border-gray-300"}`}
                    onClick={() => setSelectedDelivery(option.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{option.name}</div>
                        <div className="text-xs text-gray-600">{option.time}</div>
                      </div>
                      <div className="font-medium text-sm">
                        {option.price === 0 ? "Free" : `₦${option.price.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedDelivery !== "pickup" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />Delivery Address
                  </label>
                  <Textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your full delivery address..."
                    rows={2}
                    required
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Contact Information</h4>
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
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Special Instructions (Optional)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions for your order..."
                rows={2}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="font-medium text-gray-800 mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{selectedProduct.name} ({selectedVariant}) × {quantity}</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee:</span>
                  <span>₦{platformFee.toLocaleString()}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-[#05BBC8]">₦{total.toLocaleString()}</span>
                </div>
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
                disabled={!customerName || !customerPhone || (selectedDelivery !== "pickup" && !deliveryAddress) || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />Place Order
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
