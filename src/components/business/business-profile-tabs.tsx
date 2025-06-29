"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Business, Service } from "@/types/business"
import { 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Calendar, 
  ShoppingCart, 
  MessageCircle,
  Plus,
  Filter
} from "lucide-react"

interface BusinessProfileTabsProps {
  business: Business
  onActionClick: (action: 'booking' | 'order' | 'negotiation', item?: Service) => void
}

// Mock data for services/products
const mockServices = [
  {
    id: "1",
    name: "Premium Haircut & Styling",
    description: "Professional haircut with wash, styling, and consultation",
    price: "₦15,000",
    duration: "60 mins",
    rating: 4.8,
    category: "Hair Services"
  },
  {
    id: "2", 
    name: "Beard Grooming",
    description: "Complete beard trim, shaping, and conditioning treatment",
    price: "₦8,000",
    duration: "30 mins", 
    rating: 4.9,
    category: "Grooming"
  },
  {
    id: "3",
    name: "Hair Coloring",
    description: "Professional hair coloring with premium products",
    price: "₦25,000",
    duration: "120 mins",
    rating: 4.7,
    category: "Hair Services"
  }
]

const mockReviews = [
  {
    id: "1",
    user: "Adebayo K.",
    rating: 5,
    comment: "Excellent service! Very professional and the results exceeded my expectations.",
    date: "2 days ago",
    verified: true
  },
  {
    id: "2",
    user: "Sarah M.",
    rating: 4,
    comment: "Great experience overall. Clean environment and skilled staff.",
    date: "1 week ago",
    verified: true
  },
  {
    id: "3",
    user: "James O.",
    rating: 5,
    comment: "Best barber in town! Always delivers quality work.",
    date: "2 weeks ago",
    verified: false
  }
]

export default function BusinessProfileTabs({ business, onActionClick }: BusinessProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ))
  }

  const getActionButton = (service: Service) => {
    const baseClasses = "h-8 text-xs"
    
    switch (business.type) {
      case "order":
        return (
          <Button 
            className={`${baseClasses} bg-[#05BBC8] hover:bg-[#049aa5] text-white`}
            onClick={() => onActionClick('order', service)}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Order
          </Button>
        )
      case "booking":
        return (
          <Button 
            className={`${baseClasses} bg-[#05BBC8] hover:bg-[#049aa5] text-white`}
            onClick={() => onActionClick('booking', service)}
          >
            <Calendar className="w-3 h-3 mr-1" />
            Book
          </Button>
        )
      case "negotiation":
        return (
          <Button 
            className={`${baseClasses} bg-[#05BBC8] hover:bg-[#049aa5] text-white`}
            onClick={() => onActionClick('negotiation', service)}
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            Negotiate
          </Button>
        )
    }
  }

  return (
    <div className="mx-4 sm:mx-6 mt-6 max-w-7xl lg:mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 h-auto space-x-2">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            Overview
          </TabsTrigger>
          <TabsTrigger value="services" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            <span className="hidden sm:inline">
              {business.type === 'order' ? 'Products' : 'Services'}
            </span>
            <span className="sm:hidden">
              {business.type === 'order' ? 'Products' : 'Services'}
            </span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            Reviews
          </TabsTrigger>
          <TabsTrigger value="negotiations" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            <span className="hidden sm:inline">My History</span>
            <span className="sm:hidden">History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* About Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">About {business.name}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {business.description} We pride ourselves on delivering exceptional service 
                with attention to detail. Our experienced team uses only premium products 
                and latest techniques to ensure customer satisfaction.
              </p>

              {/* Operating Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Operating Hours
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="text-gray-600">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="text-red-600">Closed</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      +234 801 234 5678
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      info@{business.name.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      123 Business Street, {business.city}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              Available {business.type === 'order' ? 'Products' : 'Services'}
            </h3>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockServices.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <div className="text-right">
                      <div className="font-semibold text-[#05BBC8]">{service.price}</div>
                      <div className="text-xs text-gray-500">{service.duration}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <div className="flex items-center space-x-1">
                          {renderStars(service.rating)}
                        </div>
                        <span className="text-xs text-gray-500">({service.rating})</span>
                        <Badge variant="outline" className="text-xs">
                          {service.category}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                        {getActionButton(service)}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs flex-shrink-0"
                          onClick={() => onActionClick('negotiation', service)}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Negotiate
                        </Button>
                      </div>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Customer Reviews</h3>
            <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Write Review
            </Button>
          </div>

          <div className="space-y-4">
            {mockReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">{review.user}</div>
                      {review.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="negotiations" className="space-y-4">
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No Negotiation History</h3>
            <p className="text-gray-600 text-sm">
              Your negotiation history with this business will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
