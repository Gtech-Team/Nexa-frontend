"use client"

import {
  Users,
  Building2,
  Package,
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    name: "Total Users",
    value: "12,847",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    name: "Active Businesses",
    value: "2,341",
    change: "+8%",
    changeType: "positive",
    icon: Building2,
    color: "bg-[#05BBC8]",
  },
  {
    name: "Active Listings",
    value: "8,923",
    change: "+15%",
    changeType: "positive",
    icon: Package,
    color: "bg-green-500",
  },
  {
    name: "Pending Approvals",
    value: "47",
    change: "-5%",
    changeType: "negative",
    icon: CheckCircle,
    color: "bg-orange-500",
  },
  {
    name: "Featured Vendors",
    value: "156",
    change: "+3%",
    changeType: "positive",
    icon: Star,
    color: "bg-purple-500",
  },
  {
    name: "Active Bookings",
    value: "1,234",
    change: "+22%",
    changeType: "positive",
    icon: Calendar,
    color: "bg-pink-500",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "approval",
    message: 'New business "Lagos Catering Co." pending approval',
    time: "2 minutes ago",
    priority: "high",
  },
  {
    id: 2,
    type: "report",
    message: "User reported inappropriate content in negotiations",
    time: "15 minutes ago",
    priority: "high",
  },
  {
    id: 3,
    type: "signup",
    message: "5 new users signed up in the last hour",
    time: "1 hour ago",
    priority: "low",
  },
  {
    id: 4,
    type: "payment",
    message: "Featured placement payment received - ₦25,000",
    time: "2 hours ago",
    priority: "medium",
  },
]

const topCities = [
  { name: "Lagos", businesses: 1247, growth: 15 },
  { name: "Abuja", businesses: 892, growth: 12 },
  { name: "Port Harcourt", businesses: 634, growth: 8 },
  { name: "Kano", businesses: 423, growth: 22 },
  { name: "Ibadan", businesses: 387, growth: 18 },
]

const topCategories = [
  { name: "Food & Restaurants", count: 2341, percentage: 28 },
  { name: "Beauty & Wellness", count: 1876, percentage: 22 },
  { name: "Home Services", count: 1543, percentage: 18 },
  { name: "Automotive", count: 1234, percentage: 15 },
  { name: "Fashion & Retail", count: 987, percentage: 12 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening on Nexa today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Last 24 hours
          </Button>
          <Button className="bg-[#05BBC8] hover:bg-[#05BBC8]/90">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === "positive" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ml-1 ${
                        stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              3 urgent
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.priority === "high"
                      ? "bg-red-500"
                      : activity.priority === "medium"
                        ? "bg-orange-500"
                        : "bg-green-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                {activity.priority === "high" && <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />}
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Top Cities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Cities</CardTitle>
            <CardDescription>Business distribution by location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCities.map((city, index) => (
              <div key={city.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{city.name}</p>
                    <p className="text-xs text-gray-500">{city.businesses} businesses</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  +{city.growth}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Categories</CardTitle>
            <CardDescription>Most popular business categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{category.name}</p>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-[#05BBC8]/5 hover:border-[#05BBC8] bg-transparent"
            >
              <CheckCircle className="h-6 w-6 text-[#05BBC8]" />
              <span className="text-sm">Approve Vendors</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-orange-50 hover:border-orange-500 bg-transparent"
            >
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <span className="text-sm">Resolve Reports</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-500 bg-transparent"
            >
              <MapPin className="h-6 w-6 text-blue-500" />
              <span className="text-sm">Add City</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-500 bg-transparent"
            >
              <Package className="h-6 w-6 text-purple-500" />
              <span className="text-sm">Add Category</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
