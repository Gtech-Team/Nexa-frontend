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
  MessageSquare,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Send,
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

const negotiations = [
  {
    id: "NG-001",
    customer: "John Doe",
    customerAvatar: "/placeholder.svg",
    business: "Lagos Hair Studio",
    businessOwner: "Sarah Okafor",
    service: "Premium Hair Styling",
    originalPrice: "₦25,000",
    proposedPrice: "₦18,000",
    currentPrice: "₦22,000",
    discount: "12%",
    status: "active",
    priority: "high",
    lastActivity: "2 hours ago",
    messagesCount: 5,
    createdAt: "2024-01-22",
    dueDate: "2024-01-25"
  },
  {
    id: "NG-002",
    customer: "Sarah Johnson",
    customerAvatar: "/placeholder.svg",
    business: "Capture Moments",
    businessOwner: "David Okonkwo",
    service: "Wedding Photography Package",
    originalPrice: "₦300,000",
    proposedPrice: "₦220,000",
    currentPrice: "₦260,000",
    discount: "13%",
    status: "pending_business",
    priority: "medium",
    lastActivity: "1 day ago",
    messagesCount: 3,
    createdAt: "2024-01-20",
    dueDate: "2024-01-27"
  },
  {
    id: "NG-003",
    customer: "Michael Chen",
    customerAvatar: "/placeholder.svg",
    business: "TechFix Pro",
    businessOwner: "Emmanuel Adebayo",
    service: "Laptop Motherboard Repair",
    originalPrice: "₦45,000",
    proposedPrice: "₦35,000",
    currentPrice: "₦40,000",
    discount: "11%",
    status: "agreed",
    priority: "low",
    lastActivity: "3 hours ago",
    messagesCount: 7,
    createdAt: "2024-01-21",
    dueDate: "2024-01-24"
  },
  {
    id: "NG-004",
    customer: "Amara Okafor",
    customerAvatar: "/placeholder.svg",
    business: "CleanSpace Lagos",
    businessOwner: "Fatima Hassan",
    service: "Deep Home Cleaning",
    originalPrice: "₦20,000",
    proposedPrice: "₦15,000",
    currentPrice: "₦15,000",
    discount: "25%",
    status: "rejected",
    priority: "low",
    lastActivity: "5 days ago",
    messagesCount: 2,
    createdAt: "2024-01-18",
    dueDate: "2024-01-23"
  },
  {
    id: "NG-005",
    customer: "David Wilson",
    customerAvatar: "/placeholder.svg",
    business: "Green Farm Lagos",
    businessOwner: "Ahmed Ibrahim",
    service: "Monthly Vegetable Subscription",
    originalPrice: "₦12,000",
    proposedPrice: "₦9,000",
    currentPrice: "₦10,500",
    discount: "12.5%",
    status: "pending_customer",
    priority: "medium",
    lastActivity: "6 hours ago",
    messagesCount: 4,
    createdAt: "2024-01-23",
    dueDate: "2024-01-26"
  }
]

const stats = [
  {
    name: "Active Negotiations",
    value: "127",
    change: "+23%",
    changeType: "positive" as const,
    icon: MessageSquare,
    color: "bg-blue-500",
  },
  {
    name: "Success Rate",
    value: "68%",
    change: "+5%",
    changeType: "positive" as const,
    icon: CheckCircle,
    color: "bg-green-500",
  },
  {
    name: "Avg. Discount",
    value: "15.2%",
    change: "-2%",
    changeType: "negative" as const,
    icon: TrendingDown,
    color: "bg-yellow-500",
  },
  {
    name: "Total Savings",
    value: "₦850K",
    change: "+18%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "bg-[#05BBC8]",
  }
]

export default function NegotiationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedNegotiations, setSelectedNegotiations] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredNegotiations = negotiations.filter(negotiation => {
    const matchesSearch = negotiation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         negotiation.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         negotiation.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || negotiation.status === statusFilter
    const matchesPriority = priorityFilter === "all" || negotiation.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const totalPages = Math.ceil(filteredNegotiations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNegotiations = filteredNegotiations.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = () => {
    if (selectedNegotiations.length === paginatedNegotiations.length) {
      setSelectedNegotiations([])
    } else {
      setSelectedNegotiations(paginatedNegotiations.map(negotiation => negotiation.id))
    }
  }

  const handleSelectNegotiation = (negotiationId: string) => {
    setSelectedNegotiations(prev =>
      prev.includes(negotiationId)
        ? prev.filter(id => id !== negotiationId)
        : [...prev, negotiationId]
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-blue-100 text-blue-800",
      pending_business: "bg-yellow-100 text-yellow-800",
      pending_customer: "bg-orange-100 text-orange-800",
      agreed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800"
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    }
    return variants[priority as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getStatusText = (status: string) => {
    const statusTexts = {
      active: "Active",
      pending_business: "Pending Business",
      pending_customer: "Pending Customer",
      agreed: "Agreed",
      rejected: "Rejected",
      expired: "Expired"
    }
    return statusTexts[status as keyof typeof statusTexts] || status
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Negotiations</h1>
          <p className="text-gray-600 mt-1">Monitor and manage price negotiations</p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-[#05BBC8] hover:bg-[#049aa5] text-white">
          Export Report
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
                  placeholder="Search negotiations..."
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
                  <SelectItem value="pending_business">Pending Business</SelectItem>
                  <SelectItem value="pending_customer">Pending Customer</SelectItem>
                  <SelectItem value="agreed">Agreed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
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
          {selectedNegotiations.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedNegotiations.length} negotiation(s) selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Send Reminder</Button>
                  <Button size="sm" variant="outline">Mark Priority</Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Negotiations Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">
                    <Checkbox
                      checked={selectedNegotiations.length === paginatedNegotiations.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Participants</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Price Details</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Activity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNegotiations.map((negotiation) => (
                  <tr key={negotiation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <Checkbox
                        checked={selectedNegotiations.includes(negotiation.id)}
                        onCheckedChange={() => handleSelectNegotiation(negotiation.id)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{negotiation.id}</div>
                      <div className="text-sm text-gray-500">
                        Due: {negotiation.dueDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={negotiation.customerAvatar} />
                            <AvatarFallback className="text-xs">{negotiation.customer.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{negotiation.customer}</div>
                            <div className="text-xs text-gray-500">Customer</div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">{negotiation.business}</div>
                          <div className="text-xs text-gray-500">{negotiation.businessOwner}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{negotiation.service}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-gray-500">Original:</span> <span className="line-through text-gray-400">{negotiation.originalPrice}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Proposed:</span> <span className="text-blue-600 font-medium">{negotiation.proposedPrice}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Current:</span> <span className="text-green-600 font-medium">{negotiation.currentPrice}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {negotiation.discount} off
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusBadge(negotiation.status)}>
                        {getStatusText(negotiation.status)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getPriorityBadge(negotiation.priority)}>
                        {negotiation.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{negotiation.lastActivity}</div>
                        <div className="text-gray-500 flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {negotiation.messagesCount} messages
                        </div>
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
                            <Send className="h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Mark Resolved
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <XCircle className="h-4 w-4" />
                            Close Negotiation
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredNegotiations.length)} of {filteredNegotiations.length} results
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
