"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Menu, MapPin, Grid3X3 } from "lucide-react"
import { cities, businessTypes } from "@/data/mockData"

interface MobileHamburgerMenuProps {
  className?: string
  onLocationFilter?: (city: string) => void
  onCategoryFilter?: (category: string) => void
}

export default function MobileHamburgerMenu({ 
  className = "", 
  onLocationFilter,
  onCategoryFilter 
}: MobileHamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLocationClick = (city: string) => {
    // Call the filter function if provided
    if (onLocationFilter) {
      onLocationFilter(city)
    }
    
    // Also update URL for direct access
    const url = new URL(window.location.href)
    url.searchParams.set('city', city)
    window.history.pushState({}, '', url.toString())
    
    setIsOpen(false)
  }

  const handleCategoryClick = (category: string) => {
    // Call the filter function if provided
    if (onCategoryFilter) {
      onCategoryFilter(category)
    }
    
    // Also update URL for direct access
    const url = new URL(window.location.href)
    url.searchParams.set('category', category)
    window.history.pushState({}, '', url.toString())
    
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`p-2 hover:bg-gray-100 ${className}`}
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 max-h-96 overflow-y-auto bg-white"
        align="start"
        sideOffset={8}
      >
     

        {/* Categories Section */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <Grid3X3 className="w-4 h-4" />
          Categories
        </DropdownMenuLabel>
        {businessTypes.slice(0, 8).map((type) => (
          <DropdownMenuItem
            key={type}
            onClick={() => handleCategoryClick(type)}
            className="cursor-pointer"
          >
            {type}
          </DropdownMenuItem>
        ))}
        {businessTypes.length > 8 && (
          <DropdownMenuItem className="text-xs text-gray-500">
            +{businessTypes.length - 8} more categories
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Locations Section */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Locations
        </DropdownMenuLabel>
        {cities.slice(0, 6).map((city) => (
          <DropdownMenuItem
            key={city}
            onClick={() => handleLocationClick(city)}
            className="cursor-pointer"
          >
            {city}
          </DropdownMenuItem>
        ))}
        {cities.length > 6 && (
          <DropdownMenuItem className="text-xs text-gray-500">
            +{cities.length - 6} more locations
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
