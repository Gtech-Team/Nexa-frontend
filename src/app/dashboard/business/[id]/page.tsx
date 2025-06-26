"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Settings,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  ShoppingCart,
  Star,
  MessageSquare,
  Package,
  FileText,
  BarChart3,
  Globe,
  UserPlus,
  Download,
  Upload,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

// Types
interface Branch {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  isMain: boolean
  isActive: boolean
}

interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  isAvailable: boolean
  stock: number
  branchId: string
}

interface Booking {
  id: string
  customerName: string
  customerEmail: string
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  branchId: string
  notes: string
}

interface Order {
  id: string
  customerName: string
  customerEmail: string
  items: { productId: string; quantity: number; price: number }[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  branchId: string
}

interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  branchId: string
  response?: string
}

interface Negotiation {
  id: string
  customerName: string
  productId: string
  originalPrice: number
  offeredPrice: number
  status: "pending" | "accepted" | "rejected" | "countered"
  message: string
  date: string
  branchId: string
}

// Mock Data
const mockBranches: Branch[] = [
  {
    id: "1",
    name: "Main Branch",
    address: "123 Owerri Road, Owerri",
    city: "Owerri",
    phone: "+234 803 123 4567",
    email: "main@tantalizers.com",
    isMain: true,
    isActive: true,
  },
  {
    id: "2",
    name: "Enugu Branch",
    address: "456 Independence Layout, Enugu",
    city: "Enugu",
    phone: "+234 803 234 5678",
    email: "enugu@tantalizers.com",
    isMain: false,
    isActive: true,
  },
]

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Jollof Rice",
    price: 2500,
    category: "Main Course",
    description: "Delicious Nigerian jollof rice with chicken",
    image: "/placeholder.svg?height=100&width=100",
    isAvailable: true,
    stock: 50,
    branchId: "1",
  },
  {
    id: "2",
    name: "Fried Rice",
    price: 2800,
    category: "Main Course",
    description: "Tasty fried rice with vegetables and protein",
    image: "/placeholder.svg?height=100&width=100",
    isAvailable: true,
    stock: 30,
    branchId: "1",
  },
  {
    id: "3",
    name: "Chicken Suya",
    price: 1500,
    category: "Appetizer",
    description: "Grilled chicken with suya spice",
    image: "/placeholder.svg?height=100&width=100",
    isAvailable: false,
    stock: 0,
    branchId: "1",
  },
]

const mockBookings: Booking[] = [
  {
    id: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    service: "Table for 4",
    date: "2024-01-15",
    time: "19:00",
    status: "pending",
    branchId: "1",
    notes: "Birthday celebration",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    service: "Table for 2",
    date: "2024-01-16",
    time: "18:30",
    status: "confirmed",
    branchId: "1",
    notes: "Anniversary dinner",
  },
]

const mockOrders: Order[] = [
  {
    id: "1",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    items: [
      { productId: "1", quantity: 2, price: 2500 },
      { productId: "2", quantity: 1, price: 2800 },
    ],
    total: 7800,
    status: "pending",
    date: "2024-01-15T10:30:00Z",
    branchId: "1",
  },
]

const mockReviews: Review[] = [
  {
    id: "1",
    customerName: "Sarah Wilson",
    rating: 5,
    comment: "Amazing food and excellent service! Will definitely come back.",
    date: "2024-01-14",
    branchId: "1",
    response: "Thank you for your kind words! We look forward to serving you again.",
  },
  {
    id: "2",
    customerName: "David Brown",
    rating: 4,
    comment: "Good food but service was a bit slow.",
    date: "2024-01-13",
    branchId: "1",
  },
]

const mockNegotiations: Negotiation[] = [
  {
    id: "1",
    customerName: "Alex Thompson",
    productId: "1",
    originalPrice: 2500,
    offeredPrice: 2000,
    status: "pending",
    message: "Can you do ₦2000 for the jollof rice?",
    date: "2024-01-15T14:30:00Z",
    branchId: "1",
  },
]

export default function BusinessManagementPage() {
  const params = useParams()
  const businessId = params.id as string

  const [selectedBranch, setSelectedBranch] = useState("1")
  const [branches] = useState<Branch[]>(mockBranches)
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [reviews] = useState<Review[]>(mockReviews)
  const [negotiations, setNegotiations] = useState<Negotiation[]>(mockNegotiations)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock business data
  const business = {
    id: businessId,
    name: "Tantalizers Restaurant",
    logo: "/placeholder.svg?height=60&width=60",
    category: "Restaurant",
    status: "verified" as const,
    isActive: true,
  }

  const currentBranch = branches.find((b) => b.id === selectedBranch) || branches[0]
  const branchProducts = products.filter((p) => p.branchId === selectedBranch)
  const branchBookings = bookings.filter((b) => b.branchId === selectedBranch)
  const branchOrders = orders.filter((o) => o.branchId === selectedBranch)
  const branchReviews = reviews.filter((r) => r.branchId === selectedBranch)
  const branchNegotiations = negotiations.filter((n) => n.branchId === selectedBranch)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string, type: "booking" | "order" | "negotiation") => {
    const statusConfig = {
      booking: {
        pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
        confirmed: { bg: "bg-blue-100", text: "text-blue-800", label: "Confirmed" },
        completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
        cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
      },
      order: {
        pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
        processing: { bg: "bg-blue-100", text: "text-blue-800", label: "Processing" },
        shipped: { bg: "bg-purple-100", text: "text-purple-800", label: "Shipped" },
        delivered: { bg: "bg-green-100", text: "text-green-800", label: "Delivered" },
        cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
      },
      negotiation: {
        pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
        accepted: { bg: "bg-green-100", text: "text-green-800", label: "Accepted" },
        rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
        countered: { bg: "bg-blue-100", text: "text-blue-800", label: "Countered" },
      },
    }

    const config = statusConfig[type][status as keyof (typeof statusConfig)[typeof type]]
    return <Badge className={`${config.bg} ${config.text} border-0`}>{config.label}</Badge>
  }

  const updateBookingStatus = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
    )
  }

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const updateNegotiationStatus = (negotiationId: string, newStatus: Negotiation["status"]) => {
    setNegotiations((prev) =>
      prev.map((negotiation) =>
        negotiation.id === negotiationId ? { ...negotiation, status: newStatus } : negotiation,
      ),
    )
  }

  const toggleProductAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, isAvailable: !product.isAvailable } : product)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={business.logo || "/placeholder.svg"} alt={business.name} />
                  <AvatarFallback className="bg-[#05BBC8] text-white">
                    {business.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold">{business.name}</h1>
                  <p className="text-sm text-gray-600">{business.category}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">✅ Verified</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Branch Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{currentBranch.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {branches.map((branch) => (
                    <DropdownMenuItem key={branch.id} onClick={() => setSelectedBranch(branch.id)}>
                      <div className="flex items-center justify-between w-full">
                        <span>{branch.name}</span>
                        {branch.isMain && <Badge className="ml-2 text-xs">Main</Badge>}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Public Page
              </Button>

              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 gap-1">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="branches" className="text-xs">
              Branches
            </TabsTrigger>
            <TabsTrigger value="products" className="text-xs">
              Products
            </TabsTrigger>
            <TabsTrigger value="bookings" className="text-xs">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs">
              Orders
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="inventory" className="text-xs">
              Inventory
            </TabsTrigger>
            <TabsTrigger value="invoices" className="text-xs">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="negotiations" className="text-xs">
              Negotiations
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="landing" className="text-xs">
              Landing Page
            </TabsTrigger>
            <TabsTrigger value="roles" className="text-xs">
              Roles
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today&#39;s Bookings</p>
                      <p className="text-2xl font-bold">{branchBookings.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Orders</p>
                      <p className="text-2xl font-bold">{branchOrders.filter((o) => o.status === "pending").length}</p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold">
                        {branchReviews.length > 0
                          ? (branchReviews.reduce((sum, r) => sum + r.rating, 0) / branchReviews.length).toFixed(1)
                          : "0.0"}
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Products</p>
                      <p className="text-2xl font-bold">{branchProducts.filter((p) => p.isAvailable).length}</p>
                    </div>
                    <Package className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {branchBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">
                            {booking.service} - {booking.date} at {booking.time}
                          </p>
                        </div>
                        {getStatusBadge(booking.status, "booking")}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {branchOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-gray-600">
                            {order.items.length} items - {formatCurrency(order.total)}
                          </p>
                        </div>
                        {getStatusBadge(order.status, "order")}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Products & Services</h2>
              <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branchProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-lg font-bold text-[#05BBC8]">{formatCurrency(product.price)}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={product.isAvailable}
                          onCheckedChange={() => toggleProductAvailability(product.id)}
                        />
                        <span className="text-sm">{product.isAvailable ? "Available" : "Unavailable"}</span>
                      </div>
                      <Badge variant={product.stock > 10 ? "default" : "destructive"}>Stock: {product.stock}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Booking Management</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {branchBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{booking.customerName}</h3>
                          <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                        </div>
                        {getStatusBadge(booking.status, "booking")}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Service</p>
                          <p className="font-medium">{booking.service}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Date & Time</p>
                          <p className="font-medium">
                            {booking.date} at {booking.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Notes</p>
                          <p className="font-medium">{booking.notes || "No notes"}</p>
                        </div>
                      </div>

                      {booking.status === "pending" && (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => updateBookingStatus(booking.id, "confirmed")}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}

                      {booking.status === "confirmed" && (
                        <Button
                          size="sm"
                          className="bg-[#05BBC8] hover:bg-[#049aa5] text-white"
                          onClick={() => updateBookingStatus(booking.id, "completed")}
                        >
                          Mark as Completed
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Orders
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {branchOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerEmail}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status, "order")}
                          <p className="text-lg font-bold text-[#05BBC8] mt-1">{formatCurrency(order.total)}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Items:</p>
                        <div className="space-y-1">
                          {order.items.map((item, index) => {
                            const product = products.find((p) => p.id === item.productId)
                            return (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span>
                                  {product?.name} x {item.quantity}
                                </span>
                                <span>{formatCurrency(item.price * item.quantity)}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => updateOrderStatus(order.id, "processing")}
                          >
                            Start Processing
                          </Button>
                        )}
                        {order.status === "processing" && (
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => updateOrderStatus(order.id, "shipped")}
                          >
                            Mark as Shipped
                          </Button>
                        )}
                        {order.status === "shipped" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => updateOrderStatus(order.id, "delivered")}
                          >
                            Mark as Delivered
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {branchReviews.length > 0
                      ? (branchReviews.reduce((sum, r) => sum + r.rating, 0) / branchReviews.length).toFixed(1)
                      : "0.0"}
                  </p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {branchReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{review.customerName}</h3>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      {review.response ? (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 mb-1">Your Response:</p>
                          <p className="text-sm text-gray-700">{review.response}</p>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Respond to Review
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Negotiations Tab */}
          <TabsContent value="negotiations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Price Negotiations</h2>
              <div className="flex items-center space-x-2">
                <Switch />
                <span className="text-sm">Allow Negotiations</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {branchNegotiations.map((negotiation) => {
                    const product = products.find((p) => p.id === negotiation.productId)
                    return (
                      <div key={negotiation.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{negotiation.customerName}</h3>
                            <p className="text-sm text-gray-600">{product?.name}</p>
                          </div>
                          {getStatusBadge(negotiation.status, "negotiation")}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Original Price</p>
                            <p className="font-medium">{formatCurrency(negotiation.originalPrice)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Offered Price</p>
                            <p className="font-medium text-[#05BBC8]">{formatCurrency(negotiation.offeredPrice)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Difference</p>
                            <p className="font-medium text-red-600">
                              -{formatCurrency(negotiation.originalPrice - negotiation.offeredPrice)}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Customer Message:</p>
                          <p className="text-sm bg-gray-50 p-3 rounded">{negotiation.message}</p>
                        </div>

                        {negotiation.status === "pending" && (
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => updateNegotiationStatus(negotiation.id, "accepted")}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept Offer
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => updateNegotiationStatus(negotiation.id, "rejected")}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Counter Offer
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Make Counter Offer</DialogTitle>
                                  <DialogDescription>Propose a different price for {product?.name}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Counter Price</label>
                                    <Input placeholder="Enter your counter offer" />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <Textarea placeholder="Explain your counter offer..." />
                                  </div>
                                  <Button
                                    className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-white"
                                    onClick={() => updateNegotiationStatus(negotiation.id, "countered")}
                                  >
                                    Send Counter Offer
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Inventory Management</h2>
              <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Inventory Item
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branchProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
                        {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Stock:</span>
                        <span className="font-medium">{product.stock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="font-medium">{formatCurrency(product.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`font-medium ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>
                          {product.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button size="sm" variant="outline" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Update Stock
                      </Button>
                      {product.stock <= 5 && (
                        <div className="flex items-center space-x-2 text-sm text-amber-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Low stock alert</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Invoice Generator</h2>
              <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {branchOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Invoice #{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString()} - {formatCurrency(order.total)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Business Analytics</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Last 7 days
                </Button>
                <Button variant="outline" size="sm">
                  Last 30 days
                </Button>
                <Button variant="outline" size="sm">
                  Last 90 days
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(125000)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+15.3%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Page Views</p>
                      <p className="text-2xl font-bold">2,847</p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+8.2%</span>
                    <span className="text-gray-600 ml-1">from last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold">12.5%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+2.1%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Customer Satisfaction</p>
                      <p className="text-2xl font-bold">4.8/5</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+0.3</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {branchProducts.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">{formatCurrency(product.price)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{Math.floor(Math.random() * 50) + 10} orders</p>
                          <p className="text-sm text-gray-600">
                            {formatCurrency((Math.floor(Math.random() * 50) + 10) * product.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "12:00 PM - 1:00 PM", orders: 45, percentage: 85 },
                      { time: "7:00 PM - 8:00 PM", orders: 38, percentage: 72 },
                      { time: "1:00 PM - 2:00 PM", orders: 32, percentage: 60 },
                      { time: "8:00 PM - 9:00 PM", orders: 28, percentage: 53 },
                      { time: "6:00 PM - 7:00 PM", orders: 25, percentage: 47 },
                    ].map((hour, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{hour.time}</span>
                          <span className="text-sm text-gray-600">{hour.orders} orders</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#05BBC8] h-2 rounded-full" style={{ width: `${hour.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Landing Page Tab */}
          <TabsContent value="landing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Landing Page Editor</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                  <Globe className="w-4 h-4 mr-2" />
                  Publish Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Hero Title</label>
                    <Input placeholder="Welcome to our restaurant" defaultValue="Welcome to Tantalizers" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Hero Tagline</label>
                    <Input placeholder="Quality food you can trust" defaultValue="Delicious meals since 1995" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Hero Banner</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload hero banner (1200x400px recommended)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Description</label>
                    <Textarea
                      placeholder="Tell customers about your business..."
                      defaultValue="We serve authentic Nigerian cuisine with a modern twist. Our recipes have been passed down through generations."
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Call-to-Action Button</label>
                    <Input placeholder="Order Now" defaultValue="Order Now" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Featured Images</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Image {i}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-[#05BBC8] to-blue-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold mb-2">Welcome to Tantalizers</h1>
                      <p className="text-lg">Delicious meals since 1995</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      We serve authentic Nigerian cuisine with a modern twist. Our recipes have been passed down through
                      generations.
                    </p>
                    <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">Order Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Team & Role Management</h2>
              <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Team Member
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { name: "John Doe", email: "john@tantalizers.com", role: "Owner", status: "Active" },
                    { name: "Jane Smith", email: "jane@tantalizers.com", role: "Manager", status: "Active" },
                    { name: "Mike Johnson", email: "mike@tantalizers.com", role: "Staff", status: "Pending" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={member.role === "Owner" ? "default" : "secondary"}>{member.role}</Badge>
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="w-4 h-4 mr-2" />
                              Permissions
                            </DropdownMenuItem>
                            {member.role !== "Owner" && (
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Owner</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Full access to all features</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Manage team members</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Financial reports</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Business settings</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Manager</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Manage orders & bookings</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Update inventory</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>View analytics</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>Financial reports</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Staff</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>View orders & bookings</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Update order status</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>Manage inventory</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>View analytics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branches Tab */}
          <TabsContent value="branches" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Branch Management</h2>
              <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Branch
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((branch) => (
                <Card key={branch.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{branch.name}</h3>
                          {branch.isMain && <Badge className="bg-[#05BBC8] text-white">Main</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">{branch.city}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={branch.isActive} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Branch
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {!branch.isMain && (
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Branch
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{branch.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-[#05BBC8]">
                            {products.filter((p) => p.branchId === branch.id).length}
                          </p>
                          <p className="text-xs text-gray-600">Products</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-500">
                            {bookings.filter((b) => b.branchId === branch.id && b.status === "confirmed").length}
                          </p>
                          <p className="text-xs text-gray-600">Bookings</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-orange-500">
                            {orders.filter((o) => o.branchId === branch.id && o.status === "pending").length}
                          </p>
                          <p className="text-xs text-gray-600">Orders</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-[#05BBC8] hover:bg-[#049aa5] text-white"
                      onClick={() => setSelectedBranch(branch.id)}
                    >
                      Manage This Branch
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
