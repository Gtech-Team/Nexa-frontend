"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"

export default function GoogleCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')

        if (error) {
          console.error('OAuth error:', error)
          setError('Google authentication failed')
          setTimeout(() => router.push('/'), 3000)
          return
        }

        if (code) {
          // Send the authorization code to your backend
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ code, state }),
          })

          if (response.ok) {
            const data = await response.json()
            
            // Store tokens and user data
            if (data.success && data.data) {
              localStorage.setItem('token', data.data.tokens.accessToken)
              localStorage.setItem('refreshToken', data.data.tokens.refreshToken)
              localStorage.setItem('user', JSON.stringify(data.data.user))
              
              // Update auth context
              await login({
                email: data.data.user.email,
                password: '' // or provide a placeholder, since password is not used for OAuth
              })
              
              // Redirect to find-business
              router.push('/find-business')
            } else {
              throw new Error(data.message || 'Authentication failed')
            }
          } else {
            throw new Error('Failed to authenticate with backend')
          }
        } else {
          throw new Error('No authorization code received')
        }
      } catch (err) {
        console.error('Google OAuth callback error:', err)
        setError('Authentication failed. Please try again.')
        setTimeout(() => router.push('/'), 3000)
      } finally {
        setIsProcessing(false)
      }
    }

    handleCallback()
  }, [searchParams, router, login])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#05BBC8] mx-auto mb-4"></div>
        <p className="text-gray-600">
          {isProcessing ? 'Completing Google sign-in...' : 'Authentication successful!'}
        </p>
      </div>
    </div>
  )
}
