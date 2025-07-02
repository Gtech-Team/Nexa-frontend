"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Calendar,
  ShoppingCart,
  Star,
  MapPin,
  Eye,
  Clock,
  TrendingUp,
  User,
  Mail,
  Phone,
  Edit,
  ArrowRight,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Types for user dashboard data
interface SavedBusiness {
  id: string
  name: string
  category: string
  location: string
  rating: number
  image: string
  savedAt: string
}

interface Booking {
  id: string
  businessName: string
  service: string
  date: string
  time: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  amount: number
}

interface Order {
  id: string
  businessName: string
  items: string[]
  total: number
  status: "processing" | "confirmed" | "delivered" | "cancelled"
  orderDate: string
}

interface Review {
  id: string
  businessName: string
  rating: number
  comment: string
  date: string
}

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  
  // Mock data - in real app, this would come from API
  const [dashboardData, setDashboardData] = useState({
    savedBusinesses: [] as SavedBusiness[],
    recentBookings: [] as Booking[],
    orderHistory: [] as Order[],
    reviews: [] as Review[],
    stats: {
      totalSaved: 0,
      totalBookings: 0,
      totalOrders: 0,
      totalReviews: 0,
    }
  })

  useEffect(() => {
    // Simulate API call to fetch user dashboard data
    // In real implementation, replace with actual API calls
    const fetchDashboardData = () => {
      setDashboardData({
        savedBusinesses: [
          {
            id: "1",
            name: "Tech Solutions Hub",
            category: "Technology",
            location: "Victoria Island, Lagos",
            rating: 4.8,
            image: "/placeholder.svg",
            savedAt: "2025-06-15"
          },
          {
            id: "2", 
            name: "Gourmet Kitchen",
            category: "Restaurant",
            location: "Lekki, Lagos",
            rating: 4.5,
            image: "/placeholder.svg",
            savedAt: "2025-06-10"
          }
        ],
        recentBookings: [
          {
            id: "1",
            businessName: "Tech Solutions Hub",
            service: "IT Consultation",
            date: "2025-07-05",
            time: "14:00",
            status: "confirmed",
            amount: 25000
          },
          {
            id: "2",
            businessName: "Beauty Salon Pro",
            service: "Hair Styling",
            date: "2025-07-03",
            time: "10:00", 
            status: "completed",
            amount: 15000
          }
        ],
        orderHistory: [
          {
            id: "1",
            businessName: "Gourmet Kitchen",
            items: ["Jollof Rice", "Grilled Chicken", "Plantain"],
            total: 8500,
            status: "delivered",
            orderDate: "2025-06-28"
          }
        ],
        reviews: [
          {
            id: "1",
            businessName: "Beauty Salon Pro",
            rating: 5,
            comment: "Excellent service! Very professional and friendly staff.",
            date: "2025-07-03"
          }
        ],
        stats: {
          totalSaved: 2,
          totalBookings: 2,
          totalOrders: 1,
          totalReviews: 1,
        }
      })
    }

    fetchDashboardData()
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-semibold mb-4">Please log in to view your dashboard</h2>
            <Button asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.fullName?.split(" ")[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your saved businesses, bookings, and orders all in one place.
              </p>
            </div>
            <Button asChild>
              <Link href="/find-business">
                <Eye className="w-4 h-4 mr-2" />
                Find Businesses
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Businesses</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalSaved}</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Orders Placed</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reviews Given</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalReviews}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "saved", label: "Saved Businesses", icon: Heart },
                { id: "bookings", label: "Bookings", icon: Calendar },
                { id: "orders", label: "Orders", icon: ShoppingCart },
                { id: "reviews", label: "Reviews", icon: Star },
                { id: "profile", label: "Profile", icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "border-[#05BBC8] text-[#05BBC8]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{booking.businessName}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <p className="text-xs text-gray-500">{booking.date} at {booking.time}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                  {dashboardData.recentBookings.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button asChild className="h-20 flex-col">
                    <Link href="/find-business">
                      <Eye className="w-6 h-6 mb-2" />
                      Find Businesses
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => setActiveTab("saved")}>
                    <Heart className="w-6 h-6 mb-2" />
                    View Saved
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => setActiveTab("bookings")}>
                    <Calendar className="w-6 h-6 mb-2" />
                    My Bookings
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => setActiveTab("orders")}>
                    <ShoppingCart className="w-6 h-6 mb-2" />
                    Order History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "saved" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Saved Businesses</CardTitle>
              <Button asChild size="sm">
                <Link href="/find-business">
                  <Plus className="w-4 h-4 mr-2" />
                  Find More
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.savedBusinesses.map((business) => (
                  <Card key={business.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4 mb-3">
                        <Avatar>
                          <AvatarImage src={business.image} alt={business.name} />
                          <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{business.name}</h3>
                          <p className="text-sm text-gray-600">{business.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{business.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{business.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">Saved on {new Date(business.savedAt).toLocaleDateString()}</p>
                      <Button className="w-full" size="sm">
                        View Business
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {dashboardData.savedBusinesses.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No saved businesses yet</p>
                    <Button asChild>
                      <Link href="/find-business">Find Businesses to Save</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "bookings" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Bookings</CardTitle>
              <Button asChild size="sm">
                <Link href="/find-business">
                  <Plus className="w-4 h-4 mr-2" />
                  Book Service
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-semibold">{booking.businessName}</h3>
                      <p className="text-gray-600">{booking.service}</p>
                      <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <p className="text-lg font-semibold mt-2">₦{booking.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.recentBookings.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No bookings yet</p>
                    <Button asChild>
                      <Link href="/find-business">Book Your First Service</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "orders" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order History</CardTitle>
              <Button asChild size="sm">
                <Link href="/find-business">
                  <Plus className="w-4 h-4 mr-2" />
                  Place Order
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.orderHistory.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-semibold">{order.businessName}</h3>
                      <p className="text-gray-600">{order.items.join(", ")}</p>
                      <p className="text-sm text-gray-500">Ordered on {new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="text-lg font-semibold mt-2">₦{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.orderHistory.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No orders yet</p>
                    <Button asChild>
                      <Link href="/find-business">Place Your First Order</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "reviews" && (
          <Card>
            <CardHeader>
              <CardTitle>Your Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.reviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{review.businessName}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">Reviewed on {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
                {dashboardData.reviews.length === 0 && (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No reviews yet</p>
                    <Button asChild>
                      <Link href="/find-business">Try a Service and Leave a Review</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-[#05BBC8] text-white text-2xl">
                      {user?.fullName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{user?.fullName}</h2>
                    <p className="text-gray-600">
                      {user?.role
                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        : "User"} Account
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{user?.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">City</p>
                        <p className="font-medium">{user?.city || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Account Status</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Email Verified</span>
                          <Badge variant={user?.isEmailVerified ? "default" : "secondary"}>
                            {user?.isEmailVerified ? "Verified" : "Not Verified"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Phone Verified</span>
                          <Badge variant={user?.isPhoneVerified ? "default" : "secondary"}>
                            {user?.isPhoneVerified ? "Verified" : "Not Verified"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
