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
      {/* Header - Responsive */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Welcome back, {user?.fullName?.split(" ")[0]}!
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage your saved businesses, bookings, and orders all in one place.
              </p>
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/find-business">
                <Eye className="w-4 h-4 mr-2" />
                Find Businesses
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Stats Overview - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Saved Businesses</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardData.stats.totalSaved}</p>
                </div>
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardData.stats.totalBookings}</p>
                </div>
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Orders Placed</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardData.stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Reviews Given</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardData.stats.totalReviews}</p>
                </div>
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation - Smooth Toggle Style */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border border-gray-200 w-full overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "saved", label: "Saved", icon: Heart },
              { id: "bookings", label: "Bookings", icon: Calendar },
              { id: "orders", label: "Orders", icon: ShoppingCart },
              { id: "reviews", label: "Reviews", icon: Star },
              { id: "profile", label: "Profile", icon: User },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer flex items-center space-x-1 sm:space-x-2 ${
                  activeTab === tab.id
                    ? "bg-[#05BBC8] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {dashboardData.recentBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{booking.businessName}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{booking.service}</p>
                        <p className="text-xs text-gray-500">{booking.date} at {booking.time}</p>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {dashboardData.recentBookings.length === 0 && (
                    <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Button asChild className="h-16 sm:h-20 flex-col">
                    <Link href="/find-business">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                      <span className="text-xs sm:text-sm">Find Businesses</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex-col" onClick={() => setActiveTab("saved")}>
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm">View Saved</span>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex-col" onClick={() => setActiveTab("bookings")}>
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm">My Bookings</span>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex-col" onClick={() => setActiveTab("orders")}>
                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm">Order History</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "saved" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base sm:text-lg">Saved Businesses</CardTitle>
              <Button asChild size="sm">
                <Link href="/find-business">
                  <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Find More</span>
                  <span className="sm:hidden">Add</span>
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {dashboardData.savedBusinesses.map((business) => (
                  <Card key={business.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                          <AvatarImage src={business.image} alt={business.name} />
                          <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{business.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{business.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
                        <div className="flex items-center space-x-1 flex-1 min-w-0">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-600 truncate">{business.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                          <span>{business.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">Saved on {new Date(business.savedAt).toLocaleDateString()}</p>
                      <Button className="w-full" size="sm">
                        <span className="text-xs sm:text-sm">View Business</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {dashboardData.savedBusinesses.length === 0 && (
                  <div className="col-span-full text-center py-6 sm:py-8">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">No saved businesses yet</p>
                    <Button asChild>
                      <Link href="/find-business">
                        <span className="text-sm sm:text-base">Find Businesses to Save</span>
                      </Link>
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
              <CardTitle className="text-base sm:text-lg">Your Bookings</CardTitle>
              <Button asChild size="sm">
                <Link href="/find-business">
                  <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Book Service</span>
                  <span className="sm:hidden">Book</span>
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {dashboardData.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors space-y-2 sm:space-y-0">
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{booking.businessName}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm truncate">{booking.service}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{booking.date} at {booking.time}</p>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto sm:text-right sm:flex-col sm:items-end space-x-2 sm:space-x-0">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <p className="text-base sm:text-lg font-semibold sm:mt-2">₦{booking.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.recentBookings.length === 0 && (
                  <div className="text-center py-6 sm:py-8">
                    <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">No bookings yet</p>
                    <Button asChild>
                      <Link href="/find-business">
                        <span className="text-sm sm:text-base">Book Your First Service</span>
                      </Link>
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
              <CardTitle className="text-base sm:text-lg">Order History</CardTitle>
              <Button asChild size="sm">
                <Link href="/find-business">
                  <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Place Order</span>
                  <span className="sm:hidden">Order</span>
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {dashboardData.orderHistory.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors space-y-2 sm:space-y-0">
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{order.businessName}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm truncate">{order.items.join(", ")}</p>
                      <p className="text-xs sm:text-sm text-gray-500">Ordered on {new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto sm:text-right sm:flex-col sm:items-end space-x-2 sm:space-x-0">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="text-base sm:text-lg font-semibold sm:mt-2">₦{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.orderHistory.length === 0 && (
                  <div className="text-center py-6 sm:py-8">
                    <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">No orders yet</p>
                    <Button asChild>
                      <Link href="/find-business">
                        <span className="text-sm sm:text-base">Place Your First Order</span>
                      </Link>
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
              <CardTitle className="text-base sm:text-lg">Your Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {dashboardData.reviews.map((review) => (
                  <div key={review.id} className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 space-y-1 sm:space-y-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{review.businessName}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2 text-xs sm:text-sm">{review.comment}</p>
                    <p className="text-xs text-gray-500">Reviewed on {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
                {dashboardData.reviews.length === 0 && (
                  <div className="text-center py-6 sm:py-8">
                    <Star className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">No reviews yet</p>
                    <Button asChild>
                      <Link href="/find-business">
                        <span className="text-sm sm:text-base">Try a Service and Leave a Review</span>
                      </Link>
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
              <CardTitle className="text-base sm:text-lg">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                    <AvatarFallback className="bg-[#05BBC8] text-white text-lg sm:text-2xl">
                      {user?.fullName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold">{user?.fullName}</h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {user?.role
                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        : "User"} Account
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600">Email</p>
                        <p className="font-medium text-sm sm:text-base truncate">{user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-sm sm:text-base truncate">{user?.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600">City</p>
                        <p className="font-medium text-sm sm:text-base truncate">{user?.city || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <Button variant="outline" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      <span className="text-sm sm:text-base">Edit Profile</span>
                    </Button>
                    
                    <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Account Status</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm">Email Verified</span>
                          <Badge variant={user?.isEmailVerified ? "default" : "secondary"}>
                            {user?.isEmailVerified ? "Verified" : "Not Verified"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm">Phone Verified</span>
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
