/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Package,
  CreditCard,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const bookingsOrders = [
  {
    id: "BK-001",
    type: "booking",
    customer: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+234 801 234 5678",
    business: "Lagos Hair Studio",
    service: "Premium Hair Styling",
    amount: "₦15,000",
    status: "confirmed",
    date: "2024-01-25",
    time: "10:00 AM",
    createdAt: "2024-01-20",
    paymentStatus: "paid"
  },
  {
    id: "OR-002",
    type: "order",
    customer: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    customerPhone: "+234 809 876 5432",
    business: "Green Farm Lagos",
    service: "Fresh Vegetables Package",
    amount: "₦8,500",
    status: "processing",
    date: "2024-01-24",
    time: "N/A",
    createdAt: "2024-01-23",
    paymentStatus: "paid"
  },
  {
    id: "BK-003",
    type: "booking",
    customer: "Michael Chen",
    customerEmail: "m.chen@email.com",
    customerPhone: "+234 807 123 4567",
    business: "Capture Moments",
    service: "Wedding Photography",
    amount: "₦200,000",
    status: "pending",
    date: "2024-02-15",
    time: "9:00 AM",
    createdAt: "2024-01-22",
    paymentStatus: "pending"
  },
  {
    id: "OR-004",
    type: "order",
    customer: "Amara Okafor",
    customerEmail: "amara.ok@email.com",
    customerPhone: "+234 803 987 6543",
    business: "TechFix Pro",
    service: "Smartphone Screen Repair",
    amount: "₦12,000",
    status: "completed",
    date: "2024-01-21",
    time: "N/A",
    createdAt: "2024-01-19",
    paymentStatus: "paid"
  },
  {
    id: "BK-005",
    type: "booking",
    customer: "David Wilson",
    customerEmail: "d.wilson@email.com",
    customerPhone: "+234 805 456 7890",
    business: "CleanSpace Lagos",
    service: "Home Deep Cleaning",
    amount: "₦18,000",
    status: "cancelled",
    date: "2024-01-23",
    time: "2:00 PM",
    createdAt: "2024-01-21",
    paymentStatus: "refunded"
  }
]

const stats = [
  {
    name: "Total Bookings",
    value: "1,247",
    change: "+18%",
    changeType: "positive" as const,
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    name: "Total Orders",
    value: "856",
    change: "+12%",
    changeType: "positive" as const,
    icon: Package,
    color: "bg-green-500",
  },
  {
    name: "Pending Reviews",
    value: "23",
    change: "-8%",
    changeType: "negative" as const,
    icon: Clock,
    color: "bg-yellow-500",
  },
  {
    name: "Revenue (This Month)",
    value: "₦2.4M",
    change: "+25%",
    changeType: "positive" as const,
    icon: CreditCard,
    color: "bg-[#05BBC8]",
  }
]

export default function BookingsOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredItems = bookingsOrders.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesType = typeFilter === "all" || item.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(paginatedItems.map(item => item.id))
    }
  }

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      refunded: "bg-red-100 text-red-800"
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings & Orders</h1>
          <p className="text-gray-600 mt-1">Manage all customer bookings and orders</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-white">
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search bookings/orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="booking">Bookings</SelectItem>
                  <SelectItem value="order">Orders</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedItems.length} item(s) selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Confirm</Button>
                  <Button size="sm" variant="outline">Process</Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Bookings/Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">
                    <Checkbox
                      checked={selectedItems.length === paginatedItems.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Business</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Service/Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-gray-900">{item.id}</div>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{item.customer}</div>
                        <div className="text-sm text-gray-500">{item.customerEmail}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {item.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{item.business}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{item.service}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{item.amount}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{item.date}</div>
                        {item.time !== "N/A" && (
                          <div className="text-sm text-gray-500">{item.time}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getPaymentStatusBadge(item.paymentStatus)}>
                        {item.paymentStatus}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Confirm
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <XCircle className="h-4 w-4" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-[#05BBC8] hover:bg-[#049aa5]" : ""}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
