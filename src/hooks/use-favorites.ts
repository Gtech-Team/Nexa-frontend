"use client"

import { useState, useEffect } from 'react'

export interface FavoriteBusiness {
  images: string[]
  totalReviews: number
  id: string
  name: string
  category: string
  city: string
  rating: number
  price: string
  logo?: string
  verified?: boolean
  addedAt: string
}

// Extend Window interface for toast functionality
declare global {
  interface Window {
    showToast?: (message: string, type: 'success' | 'error', action: 'added' | 'removed') => void
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteBusiness[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('nexa-favorites')
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('nexa-favorites', JSON.stringify(favorites))
      } catch (error) {
        console.error('Error saving favorites:', error)
      }
    }
  }, [favorites, isLoading])

  const addToFavorites = (business: Omit<FavoriteBusiness, 'addedAt'>) => {
    const newFavorite: FavoriteBusiness = {
      ...business,
      addedAt: new Date().toISOString()
    }
    setFavorites(prev => [...prev, newFavorite])
    
    // Show success toast if available
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(`${business.name} added to favorites`, 'success', 'added')
    }
  }

  const removeFromFavorites = (businessId: string) => {
    const removedBusiness = favorites.find(fav => fav.id === businessId)
    setFavorites(prev => prev.filter(fav => fav.id !== businessId))
    
    // Show success toast if available
    if (typeof window !== 'undefined' && window.showToast && removedBusiness) {
      window.showToast(`${removedBusiness.name} removed from favorites`, 'success', 'removed')
    }
  }

  const toggleFavorite = (business: Omit<FavoriteBusiness, 'addedAt'>) => {
    const isFavorite = favorites.some(fav => fav.id === business.id)
    if (isFavorite) {
      removeFromFavorites(business.id)
    } else {
      addToFavorites(business)
    }
  }

  const isFavorite = (businessId: string) => {
    return favorites.some(fav => fav.id === businessId)
  }

  const getFavoritesCount = () => favorites.length

  const getFavoriteById = (businessId: string) => {
    return favorites.find(fav => fav.id === businessId)
  }

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    getFavoriteById
  }
}
