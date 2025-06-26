"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bell,
  Plus,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Star,
  MapPin,
  Users,
  DollarSign,
  Eye,
  Settings,
  Moon,
  Sun,
  ChevronDown,
  Building2,
  AlertTriangle,
  MessageSquare,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

// Types
interface Business {
  id: string
  name: string
  logo: string
  category: string
  branches: number
  status: "verified" | "pending" | "unverified"
  todayBookings: number
  pendingOrders: number
  avgRating: number
  totalRevenue: number
  isActive: boolean
}

interface Notification {
  id: string
  type: "booking" | "order" | "review" | "inventory" | "inquiry"
  title: string
  message: string
  time: string
  isRead: boolean
  businessId?: string
  priority: "high" | "medium" | "low"
}

interface DashboardStats {
  totalVisits: number
  totalOrders: number
  totalBookings: number
  totalRevenue: number
}

// Mock Data
const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Tantalizers Restaurant",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Restaurant",
    branches: 3,
    status: "verified",
    todayBookings: 12,
    pendingOrders: 8,
    avgRating: 4.8,
    totalRevenue: 450000,
    isActive: true,
  },
  {
    id: "2",
    name: "TechFix Repairs",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Electronics Repair",
    branches: 2,
    status: "verified",
    todayBookings: 5,
    pendingOrders: 3,
    avgRating: 4.6,
    totalRevenue: 180000,
    isActive: true,
  },
  {
    id: "3",
    name: "Beauty Palace Spa",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Beauty & Wellness",
    branches: 1,
    status: "pending",
    todayBookings: 8,
    pendingOrders: 0,
    avgRating: 4.9,
    totalRevenue: 95000,
    isActive: false,
  },
]

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "New Booking Request",
    message: "John Doe wants to book a table for 4 at Tantalizers",
    time: "2 minutes ago",
    isRead: false,
    businessId: "1",
    priority: "high",
  },
  {
    id: "2",
    type: "order",
    title: "Order Completed",
    message: "Order #1234 has been delivered successfully",
    time: "15 minutes ago",
    isRead: false,
    businessId: "1",
    priority: "medium",
  },
  {
    id: "3",
    type: "review",
    title: "New 5-Star Review",
    message: "Amazing service! Will definitely come back.",
    time: "1 hour ago",
    isRead: true,
    businessId: "2",
    priority: "low",
  },
  {
    id: "4",
    type: "inventory",
    title: "Low Stock Alert",
    message: "iPhone screen protectors running low (5 left)",
    time: "2 hours ago",
    isRead: false,
    businessId: "2",
    priority: "high",
  },
  {
    id: "5",
    type: "inquiry",
    title: "Price Negotiation",
    message: "Customer wants to negotiate price for laptop repair",
    time: "3 hours ago",
    isRead: false,
    businessId: "2",
    priority: "medium",
  },
]

const mockStats: DashboardStats = {
  totalVisits: 15420,
  totalOrders: 342,
  totalBookings: 156,
  totalRevenue: 725000,
}

export default function DashboardPage() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [stats] = useState<DashboardStats>(mockStats)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)

  const unreadNotifications = notifications.filter((n) => !n.isRead)

  const toggleBusinessStatus = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((business) => (business.id === businessId ? { ...business, isActive: !business.isActive } : business)),
    )
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="w-4 h-4 text-blue-500" />
      case "order":
        return <ShoppingCart className="w-4 h-4 text-green-500" />
      case "review":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "inventory":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "inquiry":
        return <MessageSquare className="w-4 h-4 text-purple-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">✅ Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending</Badge>
      case "unverified":
        return (
          <Badge variant="outline" className="text-gray-500">
            ❌ Unverified
          </Badge>
        )
      default:
        return null
    }
  }

  if (businesses.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        <div className="flex items-center justify-center min-h-screen">
          <Card className={`max-w-md w-full ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#05BBC8]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-[#05BBC8]" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Welcome to Nexa!</h2>
              <p className="text-gray-600 mb-6">You haven&#39;t set up any businesses yet. Let&#39;s get you started!</p>
              <Link href="/business-onboarding">
                <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Business
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-sm ${
          isDarkMode ? "bg-gray-900/80 border-gray-800" : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[#05BBC8] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Business Dashboard</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Manage your {businesses.length} business{businesses.length !== 1 ? "es" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-4 h-4" />
                    {unreadNotifications.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                        {unreadNotifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={`w-80 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold">Notifications</h3>
                    <p className="text-sm text-gray-500">{unreadNotifications.length} unread</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.slice(0, showAllNotifications ? notifications.length : 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                          !notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                        } hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {notifications.length > 5 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => setShowAllNotifications(!showAllNotifications)}
                      >
                        {showAllNotifications ? "Show Less" : `View All ${notifications.length} Notifications`}
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
                      <AvatarFallback className="bg-[#05BBC8] text-white">JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">John Doe</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="w-4 h-4 mr-2" />
                    Team Management
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div
          className={`rounded-2xl p-8 mb-8 bg-gradient-to-r from-[#05BBC8] to-blue-500 text-white relative overflow-hidden`}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
                <p className="text-blue-100 text-lg">
                  You have {unreadNotifications.length} new notifications and {businesses.length} active businesses
                </p>
              </div>
              <div className="hidden md:block">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                  <AvatarFallback className="bg-white/20 text-white text-2xl">JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* System-wide Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} backdrop-blur-sm`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Visits</p>
                  <p className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+12.5%</span>
                <span className={`ml-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} backdrop-blur-sm`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+8.2%</span>
                <span className={`ml-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} backdrop-blur-sm`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+15.3%</span>
                <span className={`ml-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} backdrop-blur-sm`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+22.1%</span>
                <span className={`ml-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Businesses Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Businesses</h2>
            <Link href="/business-onboarding">
              <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Business
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <Card
                key={business.id}
                className={`${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                } backdrop-blur-sm hover:shadow-lg transition-all duration-300 group cursor-pointer`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={business.logo || "/placeholder.svg"} alt={business.name} />
                        <AvatarFallback className="bg-[#05BBC8] text-white">
                          {business.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-[#05BBC8] transition-colors">
                          {business.name}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {business.category}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className={isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}
                      >
                        <DropdownMenuItem>
                          <Link href={`/dashboard/business/${business.id}`} className="flex items-center w-full">
                            <Settings className="w-4 h-4 mr-2" />
                            Manage Business
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Public Page
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="w-4 h-4 mr-2" />
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(business.status)}
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={business.isActive}
                          onCheckedChange={() => toggleBusinessStatus(business.id)}
                        />
                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {business.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>
                          {business.branches} branch{business.branches !== 1 ? "es" : ""}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{business.avgRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#05BBC8]">{business.todayBookings}</p>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Today&#39;s Bookings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">{business.pendingOrders}</p>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Pending Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">{formatCurrency(business.totalRevenue)}</p>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Revenue</p>
                    </div>
                  </div>

                  <Link href={`/dashboard/business/${business.id}`}>
                    <Button className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-white">Manage Business</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border-l-4 ${getPriorityColor(
                    notification.priority,
                  )} ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {notification.time}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {notification.message}
                    </p>
                    {notification.businessId && (
                      <p className={`text-xs mt-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                        {businesses.find((b) => b.id === notification.businessId)?.name}
                      </p>
                    )}
                  </div>
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="text-[#05BBC8] hover:text-[#049aa5]"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
