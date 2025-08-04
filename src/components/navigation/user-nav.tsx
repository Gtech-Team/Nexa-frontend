"use client"
import Link from "next/link"
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
import { useAuth } from "@/components/auth/auth-provider"
import NewAuthModal from "@/components/auth/new-auth-modal"
import { User as UserIcon, Heart, Calendar, ShoppingCart, MessageSquare, Settings, LogOut, ChevronDown } from "lucide-react"

export default function UserNav() {
  const { user, isAuthenticated, logout, showAuthModal, hideAuthModal, authModal } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => showAuthModal()}
          variant="ghost"
          size="sm"
          className="text-gray-700 hover:bg-gray-50 p-2"
        >
          <UserIcon className="w-5 h-5" />
        </Button>
        <NewAuthModal
          isOpen={authModal.isOpen}
          onClose={hideAuthModal}
          triggerAction={authModal.triggerAction}
          businessName={authModal.businessName}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-50 px-3 py-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={"/placeholder.svg"} alt={user?.fullName || "User"} />
            <AvatarFallback className="bg-[#05BBC8] text-white text-sm">
          {(user?.fullName
            ? user.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            : "U")}
            </AvatarFallback>
          </Avatar>
          <div className="text-left hidden sm:block">
            <p className="font-semibold text-gray-900 text-sm leading-tight">
          {user?.fullName ? user.fullName.split(" ")[0] : "User"}
            </p>
            <p className="text-xs text-gray-500">View Dashboard</p>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <div className="px-3 py-2 ">
        <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
        <p className="text-xs text-gray-500">{user?.phone}</p>
          </div>
          
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
        <Link href="/dashboard" className="flex items-center cursor-pointer w-full h-full">
          <UserIcon className="w-4 h-4 mr-3" />
          Dashboard
        </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
        <Link href="/dashboard" className="flex items-center cursor-pointer w-full h-full">
          <Heart className="w-4 h-4 mr-3" />
          <div className="flex items-center justify-between w-full">
            <span>Saved Business</span>
            <Badge variant="secondary" className="text-xs">
          0
            </Badge>
          </div>
        </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
        <Link href="/dashboard" className="flex items-center cursor-pointer w-full h-full">
          <Calendar className="w-4 h-4 mr-3" />
          <div className="flex items-center justify-between w-full">
            <span>My Bookings</span>
            <Badge variant="secondary" className="text-xs">
          0
            </Badge>
          </div>
        </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
        <Link href="/dashboard" className="flex items-center cursor-pointer w-full h-full">
          <ShoppingCart className="w-4 h-4 mr-3" />
          <div className="flex items-center justify-between w-full">
            <span>Order History</span>
            <Badge variant="secondary" className="text-xs">
          0
            </Badge>
          </div>
        </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
        <Link href="/dashboard" className="flex items-center cursor-pointer w-full h-full">
          <MessageSquare className="w-4 h-4 mr-3" />
          Messages
        </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
        <Link href="/dashboard" className="flex items-center cursor-pointer w-full h-full">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Link>
          </DropdownMenuItem>

          <DropdownMenuItem 
        className="cursor-pointer text-red-600 focus:text-red-600" 
        onClick={logout}
          >
        <LogOut className="w-4 h-4 mr-3" />
        Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <NewAuthModal
        isOpen={authModal.isOpen}
        onClose={hideAuthModal}
        triggerAction={authModal.triggerAction}
        businessName={authModal.businessName}
      />
    </div>
  )
}
