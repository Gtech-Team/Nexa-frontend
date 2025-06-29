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
import { useAuth } from "@/components/auth/auth-provider"
import AuthModal from "@/components/auth/auth-modal"
import { User as UserIcon, Heart, Calendar, ShoppingCart, MessageSquare, Settings, LogOut, ChevronDown } from "lucide-react"

type UserType = {
  name: string
  phone: string
  avatar?: string
  // add other user fields as needed
}

export default function UserNav() {
  const { user, isAuthenticated, login, logout, showAuthModal, hideAuthModal, authModal } = useAuth()

  const handleAuthSuccess = (userData: UserType & { id?: string }) => {
    // Ensure id is present; you may need to get it from userData or generate/fetch it appropriately
    const userWithId = {
      id: userData.id ?? "",
      name: userData.name,
      phone: userData.phone,
      avatar: userData.avatar ?? "",
    }
    login(userWithId)
    // Here you would resume the intended action
    console.log("Auth successful, resuming action:", authModal.triggerAction)
  }

  if (!isAuthenticated) {
    return (
      <>
        <Button
          onClick={() => showAuthModal()}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Login / Sign Up
        </Button>
        <AuthModal
          isOpen={authModal.isOpen}
          onClose={hideAuthModal}
          onSuccess={handleAuthSuccess}
          triggerAction={authModal.triggerAction}
          businessName={authModal.businessName}
        />
      </>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
              <AvatarFallback className="bg-[#05BBC8] text-white text-sm">
                {(user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "")}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block font-medium text-gray-900">{user?.name ? user.name.split(" ")[0] : ""}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="w-4 h-4 mr-3" />
              My Account
            </DropdownMenuItem>
            <p className="text-sm text-gray-500 px-10">{user?.phone}</p>
  
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="w-4 h-4 mr-3" />
              My Account
            </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Heart className="w-4 h-4 mr-3" />
            <div className="flex items-center justify-between w-full">
              <span>Saved Businesses</span>
              <Badge variant="secondary" className="text-xs">
                3
              </Badge>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Calendar className="w-4 h-4 mr-3" />
            <div className="flex items-center justify-between w-full">
              <span>My Bookings</span>
              <Badge variant="secondary" className="text-xs">
                2
              </Badge>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <ShoppingCart className="w-4 h-4 mr-3" />
            <div className="flex items-center justify-between w-full">
              <span>Order History</span>
              <Badge variant="secondary" className="text-xs">
                5
              </Badge>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <MessageSquare className="w-4 h-4 mr-3" />
            Messages
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={logout}>
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={hideAuthModal}
        onSuccess={handleAuthSuccess}
        triggerAction={authModal.triggerAction}
        businessName={authModal.businessName}
      />
    </>
  )
}
