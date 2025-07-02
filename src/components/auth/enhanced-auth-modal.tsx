"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth, useModal } from '@/store'
import {
  X,
  Phone,
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  Lock,
//   User,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Heart,
  MessageCircle,
  Calendar,
  ShoppingCart,
  Star,
  Loader2
} from 'lucide-react'

type AuthStep = 'login' | 'register' | 'forgot-password' | 'verify-email' | 'success'

export default function AuthModal() {
  const { authModal, closeAuthModal } = useModal()
  const { login, register, isLoading, error, clearError } = useAuth()
  
  const [step, setStep] = useState<AuthStep>('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (authModal.isOpen) {
      setStep(authModal.mode)
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        confirmPassword: ''
      })
      clearError()
    }
  }, [authModal.isOpen, authModal.mode, clearError])

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) clearError()
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      return
    }

    try {
      await login(formData.email, formData.password)
      setStep('success')
      setTimeout(() => {
        closeAuthModal()
      }, 1500)
    } catch {
      // Error is handled by the store
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      return
    }

    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: 'customer'
      })
      setStep('success')
      setTimeout(() => {
        closeAuthModal()
      }, 1500)
    } catch {
      // Error is handled by the store
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement forgot password logic
    setStep('verify-email')
  }

  const getActionIcon = (action?: string) => {
    switch (action) {
      case 'save':
        return <Heart className="w-5 h-5 text-red-500" />
      case 'negotiate':
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case 'book':
        return <Calendar className="w-5 h-5 text-green-500" />
      case 'order':
        return <ShoppingCart className="w-5 h-5 text-purple-500" />
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />
      default:
        return <Sparkles className="w-5 h-5 text-[#05BBC8]" />
    }
  }

  const getActionText = (action?: string) => {
    switch (action) {
      case 'save':
        return 'save this business'
      case 'negotiate':
        return 'negotiate prices'
      case 'book':
        return 'book an appointment'
      case 'order':
        return 'place an order'
      case 'review':
        return 'leave a review'
      default:
        return 'continue'
    }
  }

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back to Nexa 👋</h2>
        <p className="text-gray-600">Enter your credentials to continue</p>
        {authModal.triggerAction && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-center space-x-2">
            {getActionIcon(authModal.triggerAction)}
            <span className="text-sm text-gray-700">
              Sign in to {getActionText(authModal.triggerAction)}
            </span>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="pl-12 h-12 text-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="pl-12 pr-12 h-12 text-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!formData.email || !formData.password || isLoading}
        className="w-full h-12 bg-[#05BBC8] hover:bg-[#049aa5] text-white font-semibold text-lg"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          <>
            Sign In
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>

      <div className="text-center space-y-3">
        <button
          type="button"
          onClick={() => setStep('forgot-password')}
          className="text-sm text-[#05BBC8] hover:text-[#049aa5] font-medium"
        >
          Forgot your password?
        </button>
        
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => setStep('register')}
            className="text-[#05BBC8] hover:text-[#049aa5] font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  )

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Nexa today 🚀</h2>
        <p className="text-gray-600">Create your account to get started</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <Input
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="h-12 border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <Input
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="h-12 border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="pl-12 h-12 text-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="tel"
            placeholder="+234 803 123 4567"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="pl-12 h-12 text-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="pl-12 pr-12 h-12 text-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="pl-12 pr-12 h-12 text-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!formData.email || !formData.password || !formData.firstName || !formData.lastName || formData.password !== formData.confirmPassword || isLoading}
        className="w-full h-12 bg-[#05BBC8] hover:bg-[#049aa5] text-white font-semibold text-lg"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Creating account...</span>
          </div>
        ) : (
          <>
            Create Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setStep('login')}
            className="text-[#05BBC8] hover:text-[#049aa5] font-medium"
          >
            Sign in
          </button>
        </p>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          By creating an account, you agree to Nexa&apos;s{' '}
          <a href="#" className="text-[#05BBC8] hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#05BBC8] hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </form>
  )

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div className="text-center">
        <Button variant="ghost" onClick={() => setStep('login')} className="absolute left-4 top-4 p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset your password</h2>
        <p className="text-gray-600">Enter your email and we&apos;ll send you a reset link</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="pl-12 h-12 text-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!formData.email || isLoading}
        className="w-full h-12 bg-[#05BBC8] hover:bg-[#049aa5] text-white font-semibold text-lg"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending reset link...</span>
          </div>
        ) : (
          <>
            Send Reset Link
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </form>
  )

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 'login' ? 'Welcome back!' : 'Account created!'}
        </h2>
        <p className="text-gray-600">
          {step === 'login' ? "You're now logged in to Nexa" : 'Your Nexa account is ready to use'}
        </p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-[#05BBC8] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#05BBC8] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-[#05BBC8] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (step) {
      case 'login':
        return renderLoginForm()
      case 'register':
        return renderRegisterForm()
      case 'forgot-password':
        return renderForgotPasswordForm()
      case 'success':
        return renderSuccessStep()
      default:
        return renderLoginForm()
    }
  }

  return (
    <Dialog open={authModal.isOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white border-0 shadow-2xl">
        <div className="relative">
          {/* Close button */}
          <Button variant="ghost" onClick={closeAuthModal} className="absolute right-4 top-4 p-2 z-10 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </Button>

          {/* Content */}
          <div className="p-8">
            {renderCurrentStep()}
          </div>

          {/* Trust indicators */}
          {(step === 'login' || step === 'register') && (
            <div className="px-8 pb-6">
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Fast Setup</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>Trusted by 50K+</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
