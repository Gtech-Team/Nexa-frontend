"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth, useModal, useCart } from '@/store'
import EnhancedAuthModal from "@/components/auth/enhanced-auth-modal"
import { 
  User as UserIcon, 
  Heart, 
  Calendar, 
  ShoppingCart, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronDown,
  Building,
  Shield
} from "lucide-react"

export default function UserNav() {
  const { user, isAuthenticated, logout } = useAuth()
  const { openAuthModal } = useModal()
  const { cartCount } = useCart()

  const handleLogout = () => {
    logout()
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="hidden md:flex items-center space-x-3">
          <Button
            onClick={() => openAuthModal('login')}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Sign In
          </Button>
          <Button
            onClick={() => openAuthModal('register')}
            className="bg-[#05BBC8] hover:bg-[#049aa5] text-white"
          >
            Get Started
          </Button>
        </div>
        
        {/* Mobile auth button */}
        <div className="md:hidden">
          <Button
            onClick={() => openAuthModal('login')}
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <UserIcon className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
        
        <EnhancedAuthModal />
      </>
    )
  }

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U'

  const isBusinessOwner = user?.role === 'business_owner'
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin'

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Cart indicator */}
        {cartCount > 0 && (
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cartCount}
            </Badge>
          </Button>
        )}

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar} alt={`${user?.firstName} ${user?.lastName}`} />
                <AvatarFallback className="bg-[#05BBC8] text-white text-sm">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <div className="font-medium text-gray-900">
                  {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                </div>
                {user?.role && (
                  <div className="text-xs text-gray-500 capitalize">
                    {user.role.replace('_', ' ')}
                  </div>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-64" align="end">
            {/* User info header */}
            <div className="px-4 py-3 border-b">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user?.avatar} alt={`${user?.firstName} ${user?.lastName}`} />
                  <AvatarFallback className="bg-[#05BBC8] text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">
                    {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                  </div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                  {user?.role && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      {user.role.replace('_', ' ')}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <DropdownMenuItem>
              <UserIcon className="w-4 h-4 mr-3" />
              Profile Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              <Heart className="w-4 h-4 mr-3" />
              Saved Businesses
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              <Calendar className="w-4 h-4 mr-3" />
              My Bookings
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              <ShoppingCart className="w-4 h-4 mr-3" />
              Order History
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              <MessageSquare className="w-4 h-4 mr-3" />
              Messages
            </DropdownMenuItem>

            {isBusinessOwner && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Building className="w-4 h-4 mr-3" />
                  My Business
                </DropdownMenuItem>
              </>
            )}

            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Shield className="w-4 h-4 mr-3" />
                  Admin Panel
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <EnhancedAuthModal />
    </>
  )
}
