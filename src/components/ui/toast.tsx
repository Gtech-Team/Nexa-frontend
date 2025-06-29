"use client"

import { useState, useEffect } from 'react'
import { X, Heart, HeartOff } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error'
  action: 'added' | 'removed'
}

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error', action: 'added' | 'removed') => {
    const id = Math.random().toString(36).substring(7)
    const toast: Toast = { id, message, type, action }
    
    setToasts(prev => [...prev, toast])
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Make addToast available globally
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).showToast = addToast
  })

  return (
    <>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg border
              transform transition-all duration-300 ease-in-out
              animate-in slide-in-from-right-full
              ${toast.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
              }
            `}
          >
            {toast.action === 'added' ? (
              <Heart className="w-4 h-4 text-red-500 fill-current flex-shrink-0" />
            ) : (
              <HeartOff className="w-4 h-4 text-gray-500 flex-shrink-0" />
            )}
            
            <span className="text-sm font-medium">{toast.message}</span>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
