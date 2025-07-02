"use client"

import { AuthProvider } from '@/providers/auth-provider'
import EnhancedAuthModal from '@/components/auth/enhanced-auth-modal'

interface AppProvidersProps {
  children: React.ReactNode
}

/**
 * Root provider component that wraps the entire application
 * with all necessary providers for state management and authentication.
 * 
 * This should be used in the root layout.tsx file.
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      {children}
      {/* Global modals */}
      <EnhancedAuthModal />
    </AuthProvider>
  )
}

// Export individual providers for more granular control if needed
export { AuthProvider } from '@/providers/auth-provider'
