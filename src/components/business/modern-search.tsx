'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Search, Camera, MapPin, Filter, X, ChevronDown } from 'lucide-react'

interface ModernSearchProps {
  onSearch: (query: string) => void
  onLocationChange: (location: string) => void
  onImageSearch: (file: File) => void
  location: string
  onFiltersChange?: (filters: {
    category: string
    city: string
    priceRange: string
    rating: string
    sortBy: string
  }) => void
  businesses?: Array<{
    id: string
    name: string
    category: string
    city: string
    description: string
  }>
}

export default function ModernSearch({ 
  onSearch, 
  onLocationChange, 
  onImageSearch, 
  location,
  onFiltersChange,
  businesses = []
}: ModernSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState(location)
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    priceRange: '',
    rating: '',
    sortBy: 'AI Recommended'
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const locationInputRef = useRef<HTMLInputElement>(null)

  // Nigerian cities from your mock data
  const cities = ['Owerri', 'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Aba', 'Enugu', 'Ibadan', 'Kaduna', 'Jos']
  const categories = ['All Types', 'Restaurant', 'Hotel', 'Beauty & Spa', 'Repair Shop', 'Healthcare', 'Retail', 'Services']
  const priceRanges = ['Any Price', '₦1,000 - ₦5,000', '₦5,000 - ₦15,000', '₦15,000 - ₦50,000', '₦50,000+']
  const ratings = ['Any Rating', '4.5+ Stars', '4.0+ Stars', '3.5+ Stars', '3.0+ Stars']
  const sortOptions = ['AI Recommended', 'Most Popular', 'Highest Rated', 'Price: Low to High', 'Price: High to Low']

  // Generate search suggestions based on businesses data
  const generateSearchSuggestions = useCallback((query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchSuggestions([])
      return
    }

    const suggestions = new Set<string>()
    const lowerQuery = query.toLowerCase()

    // Add business names that match
    businesses.forEach(business => {
      if (business.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(business.name)
      }
      // Add categories that match
      if (business.category.toLowerCase().includes(lowerQuery)) {
        suggestions.add(business.category)
      }
      // Add keywords from description
      const words = business.description.toLowerCase().split(' ')
      words.forEach(word => {
        if (word.includes(lowerQuery) && word.length > 2) {
          suggestions.add(word)
        }
      })
    })

    // Add common search terms
    const commonTerms = [
      'restaurant', 'food', 'hotel', 'accommodation', 'beauty', 'spa', 'salon',
      'repair', 'mechanic', 'auto', 'healthcare', 'hospital', 'clinic',
      'gym', 'fitness', 'shopping', 'retail', 'services'
    ]
    
    commonTerms.forEach(term => {
      if (term.includes(lowerQuery)) {
        suggestions.add(term)
      }
    })

    setSearchSuggestions(Array.from(suggestions).slice(0, 8))
  }, [businesses])

  // Generate location suggestions
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateLocationSuggestions = (query: string) => {
    if (!query.trim() || query.length < 2) {
      setLocationSuggestions([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const suggestions = cities.filter(city => 
      city.toLowerCase().includes(lowerQuery)
    ).slice(0, 6)

    setLocationSuggestions(suggestions)
  }

  useEffect(() => {
    generateSearchSuggestions(searchQuery)
  }, [searchQuery, businesses, generateSearchSuggestions])

  useEffect(() => {
    generateLocationSuggestions(locationQuery)
  }, [locationQuery, generateLocationSuggestions])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
    setShowSearchSuggestions(false)
  }

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value)
    setShowSearchSuggestions(true)
  }

  const handleLocationInputChange = (value: string) => {
    setLocationQuery(value)
    setShowLocationSuggestions(true)
  }

  const handleSuggestionClick = (suggestion: string, type: 'search' | 'location') => {
    if (type === 'search') {
      setSearchQuery(suggestion)
      onSearch(suggestion)
      setShowSearchSuggestions(false)
    } else {
      setLocationQuery(suggestion)
      onLocationChange(suggestion)
      setShowLocationSuggestions(false)
    }
  }

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageSearch(file)
      setIsImageSearchOpen(false)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    if (files?.[0]) {
      onImageSearch(files[0])
      setIsImageSearchOpen(false)
    }
  }, [onImageSearch])

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      city: '',
      priceRange: '',
      rating: '',
      sortBy: 'AI Recommended'
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false)
      }
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const quickSearchTags = ['Restaurants', 'Hotels', 'Beauty Salons', 'Auto Repair', 'Gyms', 'Healthcare']

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      {/* Main Search Container */}
      <div className="rounded-2xl shadow-lg border border-gray-100 overflow-visible backdrop-blur-sm bg-white/95 relative">
        
        {/* Hero Search Bar */}
        <form onSubmit={handleSearch} className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-0">
        
        {/* Main Search Input */}
        <div className="flex-1 relative" ref={searchInputRef}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#05BBC8] w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowSearchSuggestions(true)}
            placeholder="What are you looking for?"
            className="w-full pl-10 pr-3 py-3 text-base border-0 focus:outline-none placeholder-gray-400 bg-gray-50 rounded-xl lg:rounded-r-none lg:bg-transparent lg:border-r lg:border-gray-200"
          />
          
          {/* Search Suggestions Dropdown */}
          {showSearchSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {searchSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion, 'search')}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl transition-colors"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 capitalize">{suggestion}</span>
            </button>
          ))}
            </div>
          )}
        </div>

        {/* Location Input */}
        <div className="relative lg:min-w-[160px]" ref={locationInputRef}>
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#05BBC8] w-4 h-4" />
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => handleLocationInputChange(e.target.value)}
            onFocus={() => locationQuery.length >= 2 && setShowLocationSuggestions(true)}
            placeholder="Where?"
            className="w-full pl-8 pr-3 py-3 text-sm border-0 focus:outline-none placeholder-gray-400 bg-gray-50 rounded-xl lg:bg-transparent lg:border-r lg:border-gray-200 lg:rounded-none"
          />
          
          {/* Location Suggestions Dropdown */}
          {showLocationSuggestions && locationSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          {locationSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion, 'location')}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl transition-colors"
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{suggestion}</span>
            </button>
          ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 lg:gap-2">
              {/* Image Search */}
              <button
                type="button"
                onClick={() => setIsImageSearchOpen(!isImageSearchOpen)}
                className={`p-3 rounded-xl transition-colors ${
                  isImageSearchOpen 
                    ? 'bg-[#05BBC8] text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-[#05BBC8] hover:text-white'
                }`}
                title="Search by image"
              >
                <Camera className="w-5 h-5" />
              </button>

              {/* Filters */}
              <button
                type="button"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`p-3 rounded-xl transition-colors ${
                  isFiltersOpen 
                    ? 'bg-[#05BBC8] text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-[#05BBC8] hover:text-white'
                }`}
                title="Filters"
              >
                <Filter className="w-5 h-5" />
              </button>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-[#05BBC8] to-[#049aa5] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-medium text-lg"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Image Search Dropdown */}
        {isImageSearchOpen && (
          <div className="border-t border-gray-100 p-6 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-md mx-auto">
              <div 
                onDrag={handleDrag}
                onDragStart={handleDrag}
                onDragEnd={handleDrag}
                onDragOver={handleDrag}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDrop={handleDrop}
                onClick={triggerImageUpload}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  dragOver 
                    ? 'border-[#05BBC8] bg-[#05BBC8]/5' 
                    : 'border-gray-300 hover:border-[#05BBC8] hover:bg-[#05BBC8]/5'
                }`}
              >
                <Camera className="w-12 h-12 text-[#05BBC8] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {dragOver ? 'Drop image here' : 'Upload an image to search'}
                </h3>
                <p className="text-gray-500 text-sm">
                  Find similar businesses based on photos • PNG, JPG up to 10MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        {isFiltersOpen && (
          <div className="border-t border-gray-100 p-6 bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filter Results</h3>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                <div className="relative">
                  <select 
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05BBC8] focus:border-transparent appearance-none bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat === 'All Types' ? '' : cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <div className="relative">
                  <select 
                    value={filters.city}
                    onChange={(e) => updateFilter('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05BBC8] focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <div className="relative">
                  <select 
                    value={filters.priceRange}
                    onChange={(e) => updateFilter('priceRange', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05BBC8] focus:border-transparent appearance-none bg-white"
                  >
                    {priceRanges.map(price => (
                      <option key={price} value={price === 'Any Price' ? '' : price}>{price}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Rating</label>
                <div className="relative">
                  <select 
                    value={filters.rating}
                    onChange={(e) => updateFilter('rating', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05BBC8] focus:border-transparent appearance-none bg-white"
                  >
                    {ratings.map(rating => (
                      <option key={rating} value={rating === 'Any Rating' ? '' : rating}>{rating}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                <div className="relative">
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05BBC8] focus:border-transparent appearance-none bg-white"
                  >
                    {sortOptions.map(sort => (
                      <option key={sort} value={sort}>{sort}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={clearFilters}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Clear All Filters
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsFiltersOpen(false)}
                  className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsFiltersOpen(false)}
                  className="bg-gradient-to-r from-[#05BBC8] to-[#049aa5] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Search Tags */}
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <span className="text-sm font-medium text-gray-500">Popular searches:</span>
        {quickSearchTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleQuickSearch(tag)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:border-[#05BBC8] hover:text-[#05BBC8] hover:shadow-sm transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

