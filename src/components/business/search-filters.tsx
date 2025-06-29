import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MapPin, ChevronDown } from "lucide-react"
import { SearchFiltersProps } from "@/types/business"

export default function SearchFilters({
  filters,
  onFiltersChange,
  cities,
  businessTypes,
  sortOptions,
  isLoading = false
}: SearchFiltersProps) {
  return (
    <section className="mb-6 sm:mb-8">
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="sm:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search businesses, services, or products..."
                value={filters.searchQuery}
                onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
                className="pl-10 border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8] text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* City Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="justify-between border-gray-200 text-sm sm:text-base h-9 sm:h-10"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{filters.city}</span>
                </div>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {cities.map((city) => (
                <DropdownMenuItem 
                  key={city} 
                  onClick={() => onFiltersChange({ ...filters, city })}
                  className="text-sm"
                >
                  {city}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Business Type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="justify-between border-gray-200 text-sm sm:text-base h-9 sm:h-10"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{filters.businessType}</span>
                </div>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {businessTypes.map((type) => (
                <DropdownMenuItem 
                  key={type} 
                  onClick={() => onFiltersChange({ ...filters, businessType: type })}
                  className="text-sm"
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Sort By */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-[#05BBC8] hover:text-[#049aa5] justify-start sm:justify-center p-0 sm:p-2 h-auto"
                disabled={isLoading}
              >
                <span className="text-sm">{filters.sortBy}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              {sortOptions.map((option) => (
                <DropdownMenuItem 
                  key={option} 
                  onClick={() => onFiltersChange({ ...filters, sortBy: option })}
                  className="text-sm"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  )
}
