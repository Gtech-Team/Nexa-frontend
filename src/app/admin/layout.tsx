"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Building2,
  Users,
  MapPin,
  Package,
  Calendar,
  MessageSquare,
  DollarSign,
  Brain,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react"
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

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Businesses", href: "/admin/businesses", icon: Building2, badge: "12" },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Cities & Categories", href: "/admin/locations", icon: MapPin },
  { name: "Listings", href: "/admin/listings", icon: Package, badge: "5" },
  { name: "Bookings & Orders", href: "/admin/bookings", icon: Calendar },
  { name: "Negotiations", href: "/admin/negotiations", icon: MessageSquare, badge: "3" },
  { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { name: "AI Insights", href: "/admin/ai-insights", icon: Brain },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
          <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-6 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#05BBC8] to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Nexa Admin</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-6 px-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors ${
                      isActive
                        ? "bg-[#05BBC8]/10 text-[#05BBC8] border-r-2 border-[#05BBC8]"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#05BBC8] to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Nexa Admin</h1>
                  <p className="text-xs text-gray-500">Super Dashboard</p>
                </div>
              </div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium leading-6 transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-[#05BBC8]/10 to-blue-50 text-[#05BBC8] shadow-sm border-l-4 border-[#05BBC8]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#05BBC8]"
                        }`}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top navigation */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="relative flex flex-1 items-center">
                <Search className="pointer-events-none absolute left-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search businesses, users, or orders..."
                  className="pl-10 w-full max-w-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
                />
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>

                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-[#05BBC8] text-white">SA</AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:flex lg:items-center">
                        <span className="ml-2 text-sm font-medium text-gray-700">Super Admin</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Activity Log</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="py-6 bg-gray-50 min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </Suspense>
  )
}
