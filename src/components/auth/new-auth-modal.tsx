/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useAuth } from "@/components/auth/auth-provider"
import { googleAuth } from "@/lib/google-auth"
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
//   ArrowLeft,
  Eye,
  EyeOff,
  MapPin,
  Sparkles,
//   Shield,
  Heart,
  MessageCircle,
  Calendar,
  ShoppingCart,
  Star,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react"

interface NewAuthModalProps {
  isOpen: boolean
  onClose: () => void
  triggerAction?: string
  businessName?: string
}

export default function NewAuthModal({ isOpen, onClose, triggerAction, businessName }: NewAuthModalProps) {
  const { login, register, signInWithGoogle, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")
  const googleButtonRef = useRef<HTMLDivElement>(null)

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user" as "user" | "business",
    city: "",
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setLoginForm({ email: "", password: "" })
      setSignupForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "user",
        city: "",
      })
      setFormErrors({})
      setSubmitError("")
      setSubmitSuccess("")
      setShowPassword(false)
    }
  }, [isOpen])

  // Initialize Google OAuth when modal opens
  useEffect(() => {
    if (isOpen && googleButtonRef.current) {
      const initGoogleAuth = async () => {
        try {
          await googleAuth.initializeGoogleAuth()
          if (googleButtonRef.current) {
            googleAuth.renderSignInButton(googleButtonRef.current, {
              theme: 'outline',
              size: 'large',
              width: googleButtonRef.current.offsetWidth,
              text: activeTab === "login" ? "signin_with" : "signup_with",
            })
          }
        } catch (error) {
          console.error("Failed to initialize Google Auth:", error)
        }
      }
      
      // Small delay to ensure the modal is fully rendered
      setTimeout(initGoogleAuth, 100)
    }
  }, [isOpen, activeTab])

  const getActionIcon = (action?: string) => {
    switch (action) {
      case "save":
        return <Heart className="w-5 h-5 text-red-500" />
      case "negotiate":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "book":
        return <Calendar className="w-5 h-5 text-green-500" />
      case "order":
        return <ShoppingCart className="w-5 h-5 text-purple-500" />
      case "review":
        return <Star className="w-5 h-5 text-yellow-500" />
      default:
        return <Sparkles className="w-5 h-5 text-[#05BBC8]" />
    }
  }

  const getActionText = (action?: string) => {
    switch (action) {
      case "save":
        return "save this business"
      case "negotiate":
        return "start price negotiation"
      case "book":
        return "book an appointment"
      case "order":
        return "place an order"
      case "review":
        return "leave a review"
      case "message":
        return "message the vendor"
      default:
        return "continue"
    }
  }

  const validateForm = (isLogin: boolean): boolean => {
    const errors: Record<string, string> = {}

    if (isLogin) {
      if (!loginForm.email) errors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email))
        errors.email = "Please enter a valid email"
      
      if (!loginForm.password) errors.password = "Password is required"
    } else {
      if (!signupForm.fullName) errors.fullName = "Full name is required"
      else if (signupForm.fullName.length < 2)
        errors.fullName = "Full name must be at least 2 characters"
      
      if (!signupForm.email) errors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email))
        errors.email = "Please enter a valid email"
      
      if (!signupForm.phone) errors.phone = "Phone number is required"
      else if (
        !/^\+?[1-9]\d{1,14}$/.test(signupForm.phone.replace(/[\s()-]/g, "")) && // international
        !/^0\d{10}$/.test(signupForm.phone.replace(/[\s()-]/g, "")) // local Nigerian
      )
        errors.phone = "Please enter a valid phone number"
      
      if (!signupForm.password) errors.password = "Password is required"
      else if (signupForm.password.length < 8)
        errors.password = "Password must be at least 8 characters"
      
      if (!signupForm.confirmPassword) errors.confirmPassword = "Please confirm your password"
      else if (signupForm.password !== signupForm.confirmPassword)
        errors.confirmPassword = "Passwords do not match"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")

    if (!validateForm(true)) return

    try {
      const result = await login(loginForm)
      
      if (result.success) {
        setSubmitSuccess("Login successful! Welcome back.")
        setTimeout(() => {
          onClose()
          router.push('/find-business')
        }, 1000)
      } else {
        setSubmitError(result.message || "Login failed. Please try again.")
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred. Please try again.")
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")

    if (!validateForm(false)) return

    try {
      const result = await register(signupForm)
      
      if (result.success) {
        setSubmitSuccess("Account created successfully! Welcome to Nexa.")
        setTimeout(() => {
          onClose()
          router.push('/find-business')
        }, 1000)
      } else {
        setSubmitError(result.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred. Please try again.")
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      setSubmitError("Google sign-in failed. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#05BBC8] to-[#0A9FB5] p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              {/* <X className="w-6 h-6" /> */}
            </button>
            
            <div className="flex items-center space-x-2 mb-2">
              {getActionIcon(triggerAction)}
              <span className="text-sm opacity-90">
                {triggerAction ? `Sign in to ${getActionText(triggerAction)}` : "Welcome to Nexa"}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold">
              {activeTab === "login" ? "Sign In" : "Create Account"}
            </h2>
            
            {businessName && (
              <p className="text-sm opacity-90 mt-1">
                for <span className="font-semibold">{businessName}</span>
              </p>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-50">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === "login"
                  ? "bg-white text-[#05BBC8] border-b-2 border-[#05BBC8]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === "signup"
                  ? "bg-white text-[#05BBC8] border-b-2 border-[#05BBC8]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Success/Error Messages */}
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 text-sm">{submitSuccess}</span>
              </div>
            )}
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 text-sm">{submitError}</span>
              </div>
            )}

            {/* Google Sign In Button */}
            <div className="mb-6">
              <div ref={googleButtonRef} className="w-full" onClick={handleGoogleSignIn}>
                {/* Fallback button if Google button doesn't load */}
                <Button
                  variant="outline"
                  className="w-full py-3 flex items-center justify-center space-x-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </Button>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className={`pl-11 py-3 ${formErrors.email ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className={`pl-11 pr-11 py-3 ${formErrors.password ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#05BBC8] hover:bg-[#0A9FB5] text-white py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Full name"
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                      className={`pl-11 py-3 ${formErrors.fullName ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {formErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      className={`pl-11 py-3 ${formErrors.email ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                      className={`pl-11 py-3 ${formErrors.phone ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="City (optional)"
                      value={signupForm.city}
                      onChange={(e) => setSignupForm({ ...signupForm, city: e.target.value })}
                      className="pl-11 py-3"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      className={`pl-11 pr-11 py-3 ${formErrors.password ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      className={`pl-11 py-3 ${formErrors.confirmPassword ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Account Type</label>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={signupForm.role === "user" ? "default" : "outline"}
                      onClick={() => setSignupForm({ ...signupForm, role: "user" })}
                      className="flex-1 py-2"
                      disabled={isLoading}
                    >
                      Customer
                    </Button>
                    <Button
                      type="button"
                      variant={signupForm.role === "business" ? "default" : "outline"}
                      onClick={() => setSignupForm({ ...signupForm, role: "business" })}
                      className="flex-1 py-2"
                      disabled={isLoading}
                    >
                      Business
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#05BBC8] hover:bg-[#0A9FB5] text-white py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Terms and Privacy */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#05BBC8] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#05BBC8] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
