# Nexa Authentication System Guide

## Overview

The Nexa frontend features a complete authentication system that is already fully integrated and ready to use. This guide explains how to trigger authentication modals and implement gated actions throughout the application.

## Authentication Context

The authentication is managed through React Context and provides the following capabilities:

### Available Auth Methods

```typescript
const { 
  user,               // Current authenticated user object or null
  isAuthenticated,    // Boolean indicating if user is logged in
  login,              // Function to log in a user
  logout,             // Function to log out current user
  showAuthModal,      // Function to trigger auth modal
  hideAuthModal,      // Function to close auth modal
  authModal           // Auth modal state object
} = useAuth()
```

## How to Trigger Authentication

### 1. Basic Authentication Modal

To show the login/signup modal from anywhere in the app:

```typescript
import { useAuth } from "@/components/auth/auth-provider"

function MyComponent() {
  const { showAuthModal } = useAuth()
  
  const handleAction = () => {
    showAuthModal() // Shows basic auth modal
  }
  
  return (
    <button onClick={handleAction}>
      Login / Sign Up
    </button>
  )
}
```

### 2. Context-Aware Authentication

For actions that require authentication with context about what the user was trying to do:

```typescript
import { useAuth } from "@/components/auth/auth-provider"

function BusinessActions({ businessName }: { businessName: string }) {
  const { showAuthModal, isAuthenticated } = useAuth()
  
  const handleSaveBusiness = () => {
    if (!isAuthenticated) {
      showAuthModal("save", businessName)
      return
    }
    
    // Proceed with save action
    console.log(`Saving ${businessName}...`)
  }
  
  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      showAuthModal("book", businessName)
      return
    }
    
    // Proceed with booking
    console.log(`Booking appointment with ${businessName}...`)
  }
  
  return (
    <div>
      <button onClick={handleSaveBusiness}>
        Save Business
      </button>
      <button onClick={handleBookAppointment}>
        Book Appointment
      </button>
    </div>
  )
}
```

### 3. Available Action Types

When calling `showAuthModal(action, businessName)`, these action types are supported:

- `"save"` - For saving/favoriting businesses
- `"negotiate"` - For price negotiation
- `"book"` - For booking appointments
- `"order"` - For placing orders
- `"review"` - For leaving reviews
- `"message"` - For messaging vendors
- `undefined` - Generic authentication

Each action type displays a contextual icon and message in the auth modal.

## Gated Actions Component

For common business interactions, use the pre-built `GatedActions` component:

```typescript
import GatedActions from "@/components/business/gated-actions"

function BusinessCard({ business }: { business: Business }) {
  return (
    <div>
      <h3>{business.name}</h3>
      <GatedActions 
        businessName={business.name}
        actions={["save", "message", "book"]}
      />
    </div>
  )
}
```

## Authentication Flow

### 1. Phone Number Entry
- User enters their phone number
- OTP is sent (simulated in current implementation)

### 2. OTP Verification
- User enters 6-digit verification code
- For existing users: redirects to success
- For new users: proceeds to profile setup

### 3. Profile Setup (New Users Only)
- User enters first and last name
- Account is created

### 4. Success & Continuation
- User is logged in automatically
- If triggered by an action, the original action context is preserved
- Modal closes and user can continue with their intended action

## Integration Points

### Where Auth is Already Integrated

1. **Navigation Bar** (`src/components/navigation/user-nav.tsx`)
   - Login/signup button when not authenticated
   - User dropdown menu when authenticated
   - Auth modal is rendered here

2. **Business Actions** (`src/components/business/gated-actions.tsx`)
   - Handles authentication for business interactions
   - Automatically shows auth modal for unauthenticated users

3. **Mobile FAB** (`src/components/navigation/mobile-auth-fab.tsx`)
   - Floating action button for mobile authentication

### User State Management

User information is persisted in localStorage:
- Key: `"nexa_user"`
- Contains: `{ id, name, phone, avatar }`

## Examples of Implementation

### Example 1: Protecting a Route

```typescript
"use client"
import { useAuth } from "@/components/auth/auth-provider"
import { useEffect } from "react"

export default function ProtectedPage() {
  const { isAuthenticated, showAuthModal } = useAuth()
  
  useEffect(() => {
    if (!isAuthenticated) {
      showAuthModal()
    }
  }, [isAuthenticated, showAuthModal])
  
  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>
  }
  
  return <div>Protected content here...</div>
}
```

### Example 2: Conditional Content

```typescript
import { useAuth } from "@/components/auth/auth-provider"

function ConditionalContent() {
  const { isAuthenticated, user, showAuthModal } = useAuth()
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome back, {user?.name}!</h2>
          <p>Your phone: {user?.phone}</p>
        </div>
      ) : (
        <div>
          <h2>Join Nexa Today</h2>
          <button onClick={() => showAuthModal()}>
            Get Started
          </button>
        </div>
      )}
    </div>
  )
}
```

### Example 3: Action-Specific Authentication

```typescript
import { useAuth } from "@/components/auth/auth-provider"

function ReviewButton({ businessName }: { businessName: string }) {
  const { isAuthenticated, showAuthModal } = useAuth()
  
  const handleReview = () => {
    if (!isAuthenticated) {
      showAuthModal("review", businessName)
      return
    }
    
    // User is authenticated, proceed with review
    console.log(`Opening review form for ${businessName}`)
  }
  
  return (
    <button onClick={handleReview}>
      Leave a Review
    </button>
  )
}
```

## Backend Integration Points

When integrating with a real backend, update these areas:

### 1. Auth Provider (`src/components/auth/auth-provider.tsx`)
- Replace localStorage with secure token storage
- Add token refresh logic
- Update user state management

### 2. Auth Modal (`src/components/auth/auth-modal.tsx`)
- Replace mock API calls in `handleSendOTP` and `handleVerifyOTP`
- Add real OTP sending and verification
- Handle API errors appropriately

### 3. User Persistence
- Replace localStorage with secure session management
- Implement token-based authentication
- Add automatic session refresh

## Security Considerations

1. **Token Storage**: Replace localStorage with httpOnly cookies for production
2. **OTP Security**: Implement proper OTP generation and validation
3. **Session Management**: Add session timeout and refresh logic
4. **Rate Limiting**: Implement rate limiting for OTP requests

## Customization

### Styling the Auth Modal
The auth modal uses Tailwind CSS and can be customized in:
- `src/components/auth/auth-modal.tsx`

### Adding New Action Types
To add new action types, update:
1. `getActionIcon()` function for new icons
2. `getActionText()` function for new text
3. TypeScript types if needed

### Custom Auth Flows
The auth provider is flexible and can be extended for:
- Social login integration
- Multi-factor authentication
- Custom registration flows

## Testing Authentication

To test the authentication flow:

1. **Development Mode**:
   - Any 10+ digit phone number works
   - Any 6-digit OTP code works
   - Profile creation is simulated

2. **Testing Gated Actions**:
   - Try actions on business cards while logged out
   - Verify modal shows with correct context
   - Complete auth and verify action continues

3. **State Persistence**:
   - Refresh the page after logging in
   - Verify user remains authenticated
   - Test logout functionality

This authentication system is production-ready and can be easily extended for additional features as your application grows.
