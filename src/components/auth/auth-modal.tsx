"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { GoogleOAuth } from "@/lib/google-auth"
import {
  X,
  Phone,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Shield,
  Heart,
  MessageCircle,
  Calendar,
  ShoppingCart,
  Star,
} from "lucide-react"

interface User {
  id: string
  name: string
  phone: string
  avatar: string
}

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: User) => void
  triggerAction?: string
  businessName?: string
}

interface OTPInputProps {
  length: number
  value: string
  onChange: (value: string) => void
}

const OTPInput = ({ length, value, onChange }: OTPInputProps) => {
  const [inputs, setInputs] = useState<string[]>(Array(length).fill(""))

  useEffect(() => {
    setInputs(value.split("").concat(Array(length - value.length).fill("")))
  }, [value, length])

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) return

    const newInputs = [...inputs]
    newInputs[index] = val
    setInputs(newInputs)
    onChange(newInputs.join(""))

    // Auto-focus next input
    if (val && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="flex space-x-3 justify-center">
      {inputs.map((input, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={input}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#05BBC8] focus:outline-none transition-colors"
        />
      ))}
    </div>
  )
}

export default function AuthModal({ isOpen, onClose, onSuccess, triggerAction, businessName }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [step, setStep] = useState<"phone" | "otp" | "profile" | "success">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep("phone")
      setPhoneNumber("")
      setOtpCode("")
      setFirstName("")
      setLastName("")
      setIsLoading(false)
      setCountdown(0)
    }
  }, [isOpen])

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

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

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep("otp")
    setCountdown(30)
  }

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    if (activeTab === "signup") {
      setStep("profile")
    } else {
      setStep("success")
      setTimeout(() => {
        onSuccess({
          id: "1",
          name: "John Doe",
          phone: phoneNumber,
          avatar: "/placeholder.svg?height=40&width=40",
        })
        onClose()
      }, 1500)
    }
  }

  const handleCompleteSignup = async () => {
    if (!firstName || !lastName) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep("success")

    setTimeout(() => {
      onSuccess({
        id: "1",
        name: `${firstName} ${lastName}`,
        phone: phoneNumber,
        avatar: "/placeholder.svg?height=40&width=40",
      })
      onClose()
    }, 1500)
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setCountdown(30)
  }

  const handleGoogleLogin = async () => {
    try {
      const googleAuth = GoogleOAuth.getInstance()
      googleAuth.initiateGoogleOAuth()
    } catch (error) {
      console.error('Google OAuth error:', error)
      // Fallback to manual redirect if needed
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
      });

      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }
  }

  const renderPhoneStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {activeTab === "login" ? "Welcome back to Nexa 👋" : "Join Nexa today 🚀"}
        </h2>
        <p className="text-gray-600">
          {activeTab === "login" ? "Enter your phone number to continue" : "Create your account to get started"}
        </p>
        {triggerAction && businessName && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-center space-x-2">
            {getActionIcon(triggerAction)}
            <span className="text-sm text-gray-700">
              Sign in to {getActionText(triggerAction)} at <span className="font-medium">{businessName}</span>
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="tel"
              placeholder="+234 803 123 4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-12 h-12 text-lg border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            />
          </div>
        </div>

        <Button
          onClick={handleSendOTP}
          disabled={!phoneNumber || phoneNumber.length < 10 || isLoading}
          className="w-full h-12 bg-[#05BBC8] hover:bg-[#049aa5] text-white font-semibold text-lg"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending code...</span>
            </div>
          ) : (
            <>
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded"></div>
            <span>Continue with Google</span>
          </div>
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
            className="text-[#05BBC8] hover:text-[#049aa5] font-medium"
          >
            {activeTab === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  )

  const renderOTPStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Button variant="ghost" onClick={() => setStep("phone")} className="absolute left-4 top-4 p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your number</h2>
        <p className="text-gray-600">
          We sent a 6-digit code to <span className="font-medium">{phoneNumber}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">Enter verification code</label>
          <OTPInput length={6} value={otpCode} onChange={setOtpCode} />
        </div>

        <Button
          onClick={handleVerifyOTP}
          disabled={otpCode.length !== 6 || isLoading}
          className="w-full h-12 bg-[#05BBC8] hover:bg-[#049aa5] text-white font-semibold text-lg"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            <>
              Verify Code
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Didn&#39;t receive the code?</p>
          {countdown > 0 ? (
            <p className="text-sm text-gray-400">Resend in {countdown}s</p>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={isLoading}
              className="text-sm text-[#05BBC8] hover:text-[#049aa5] font-medium"
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Button variant="ghost" onClick={() => setStep("otp")} className="absolute left-4 top-4 p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete your profile</h2>
        <p className="text-gray-600">Tell us a bit about yourself</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <Input
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <Input
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 border-gray-200 focus:border-[#05BBC8] focus:ring-[#05BBC8]"
            />
          </div>
        </div>

        <Button
          onClick={handleCompleteSignup}
          disabled={!firstName || !lastName || isLoading}
          className="w-full h-12 bg-[#05BBC8] hover:bg-[#049aa5] text-white font-semibold text-lg"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            <>
              Complete Setup
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to Nexa&#39;s{" "}
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
  )

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {activeTab === "login" ? "Welcome back!" : "Account created!"}
        </h2>
        <p className="text-gray-600">
          {activeTab === "login" ? "You're now logged in to Nexa" : "Your Nexa account is ready to use"}
        </p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-[#05BBC8] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#05BBC8] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-[#05BBC8] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white border-0 shadow-2xl">
        <div className="relative">
          {/* Close button */}
          <Button variant="ghost" onClick={onClose} className="absolute right-4 top-4 p-2 z-10 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </Button>

          {/* Content */}
          <div className="p-8">
            {step === "phone" && renderPhoneStep()}
            {step === "otp" && renderOTPStep()}
            {step === "profile" && renderProfileStep()}
            {step === "success" && renderSuccessStep()}
          </div>

          {/* Trust indicators */}
          {step === "phone" && (
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
