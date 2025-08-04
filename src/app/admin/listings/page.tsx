/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Package,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
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

const listings = [
  {
    id: 1,
    title: "Premium Hair Styling Service",
    business: "Lagos Hair Studio",
    businessOwner: "Sarah Okafor",
    category: "Beauty & Wellness",
    type: "Service",
    price: "₦15,000 - ₦25,000",
    status: "active",
    featured: true,
    views: 1234,
    bookings: 45,
    createdAt: "2024-01-15",
    lastModified: "2024-01-20",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Fresh Organic Vegetables",
    business: "Green Farm Lagos",
    businessOwner: "Ahmed Ibrahim",
    category: "Food & Groceries",
    type: "Product",
    price: "₦2,500 - ₦8,000",
    status: "pending",
    featured: false,
    views: 856,
    bookings: 0,
    createdAt: "2024-01-18",
    lastModified: "2024-01-18",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Wedding Photography Package",
    business: "Capture Moments",
    businessOwner: "David Okonkwo",
    category: "Photography",
    type: "Service",
    price: "₦150,000 - ₦300,000",
    status: "active",
    featured: true,
    views: 567,
    bookings: 12,
    createdAt: "2024-01-10",
    lastModified: "2024-01-22",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Smartphone Repair Service",
    business: "TechFix Pro",
    businessOwner: "Emmanuel Adebayo",
    category: "Technology",
    type: "Service",
    price: "₦5,000 - ₦50,000",
    status: "suspended",
    featured: false,
    views: 423,
    bookings: 8,
    createdAt: "2024-01-12",
    lastModified: "2024-01-19",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Home Cleaning Service",
    business: "CleanSpace Lagos",
    businessOwner: "Fatima Hassan",
    category: "Home Services",
    type: "Service",
    price: "₦8,000 - ₦20,000",
    status: "active",
    featured: false,
    views: 789,
    bookings: 23,
    createdAt: "2024-01-14",
    lastModified: "2024-01-21",
    image: "/placeholder.svg"
  }
]

const stats = [
  {
    name: "Total Listings",
    value: "8,923",
    change: "+15%",
    changeType: "positive" as const,
    icon: Package,
    color: "bg-blue-500",
  },
  {
    name: "Active Listings",
    value: "7,856",
    change: "+12%",
    changeType: "positive" as const,
    icon: CheckCircle,
    color: "bg-green-500",
  },
  {
    name: "Pending Approval",
    value: "47",
    change: "-5%",
    changeType: "negative" as const,
    icon: Clock,
    color: "bg-yellow-500",
  },
  {
    name: "Featured Listings",
    value: "234",
    change: "+8%",
    changeType: "positive" as const,
    icon: Star,
    color: "bg-[#05BBC8]",
  }
]

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedListings, setSelectedListings] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.businessOwner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedListings = filteredListings.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = () => {
    if (selectedListings.length === paginatedListings.length) {
      setSelectedListings([])
    } else {
      setSelectedListings(paginatedListings.map(listing => listing.id))
    }
  }

  const handleSelectListing = (listingId: number) => {
    setSelectedListings(prev =>
      prev.includes(listingId)
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800"
    }
    return variants[status as keyof typeof variants] || variants.draft
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Listings Management</h1>
          <p className="text-gray-600 mt-1">Manage all business listings and services</p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-[#05BBC8] hover:bg-[#049aa5] text-white">
          Add New Listing
        </Button>
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
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
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
          {selectedListings.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedListings.length} listing(s) selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Approve</Button>
                  <Button size="sm" variant="outline">Suspend</Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Listings Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">
                    <Checkbox
                      checked={selectedListings.length === paginatedListings.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Listing</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Business</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedListings.map((listing) => (
                  <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <Checkbox
                        checked={selectedListings.includes(listing.id)}
                        onCheckedChange={() => handleSelectListing(listing.id)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={listing.image} />
                          <AvatarFallback>{listing.title.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{listing.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            {listing.type}
                            {listing.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{listing.business}</div>
                        <div className="text-sm text-gray-500">{listing.businessOwner}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{listing.category}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{listing.price}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusBadge(listing.status)}>
                        {listing.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{listing.views} views</div>
                        <div className="text-gray-500">{listing.bookings} bookings</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Listing
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Delete
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredListings.length)} of {filteredListings.length} results
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-[#05BBC8] hover:bg-[#049aa5]" : ""}
                    >
                      {page}
                    </Button>
                  ))}
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
