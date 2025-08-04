"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'dark' | 'light'
  isLoaded: boolean
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  actualTheme: 'light',
  isLoaded: false,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'nexa-ui-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('light')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    // Helper function to get system theme
    const getSystemTheme = (): 'dark' | 'light' => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    // Helper function to apply theme to DOM
    const applyTheme = (newTheme: 'dark' | 'light') => {
      if (disableTransitionOnChange) {
        root.classList.add('[&_*]:!transition-none')
      }

      root.classList.remove('light', 'dark')
      
      if (attribute === 'class') {
        root.classList.add(newTheme)
      } else {
        root.setAttribute(attribute, newTheme)
      }
      
      setActualTheme(newTheme)

      if (disableTransitionOnChange) {
        // Force reflow
        void root.offsetHeight
        root.classList.remove('[&_*]:!transition-none')
      }
    }

    // Initialize theme from localStorage or use default
    const initializeTheme = () => {
      try {
        const storedTheme = localStorage.getItem(storageKey) as Theme | null
        const initialTheme = storedTheme || defaultTheme
        
        setTheme(initialTheme)
        
        let themeToApply: 'dark' | 'light'
        
        if (initialTheme === 'system') {
          themeToApply = getSystemTheme()
        } else {
          themeToApply = initialTheme as 'dark' | 'light'
        }
        
        applyTheme(themeToApply)
        setIsLoaded(true)
      } catch (error) {
        console.warn('Failed to load theme from localStorage:', error)
        // Fallback to default theme
        const fallbackTheme = defaultTheme === 'system' ? getSystemTheme() : (defaultTheme as 'dark' | 'light')
        applyTheme(fallbackTheme)
        setTheme(defaultTheme)
        setIsLoaded(true)
      }
    }

    // Initialize theme immediately
    initializeTheme()

    // Listen for system theme changes if enableSystem is true
    if (enableSystem) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = () => {
        if (theme === 'system') {
          const systemTheme = getSystemTheme()
          applyTheme(systemTheme)
        }
      }

      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme, attribute, defaultTheme, storageKey, enableSystem, disableTransitionOnChange])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      try {
        // Save to localStorage
        localStorage.setItem(storageKey, newTheme)
        
        // Update state
        setTheme(newTheme)
        
        // Apply theme to DOM immediately
        const root = window.document.documentElement
        let themeToApply: 'dark' | 'light'
        
        if (newTheme === 'system') {
          themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        } else {
          themeToApply = newTheme as 'dark' | 'light'
        }
        
        if (disableTransitionOnChange) {
          root.classList.add('[&_*]:!transition-none')
        }

        root.classList.remove('light', 'dark')
        
        if (attribute === 'class') {
          root.classList.add(themeToApply)
        } else {
          root.setAttribute(attribute, themeToApply)
        }
        
        setActualTheme(themeToApply)

        if (disableTransitionOnChange) {
          // Force reflow
          void root.offsetHeight
          root.classList.remove('[&_*]:!transition-none')
        }
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error)
      }
    },
    actualTheme,
    isLoaded,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
