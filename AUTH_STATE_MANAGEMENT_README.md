# Nexa Authentication & State Management System

## Overview

This is a production-grade authentication and state management system built with **Zustand** for the Nexa application. The system provides a scalable, performant, and type-safe solution for managing authentication, user state, application state, and UI modals.

## Architecture

### Why Zustand?

Zustand was chosen as the state management solution for the following reasons:

1. **Performance**: Minimal boilerplate and optimal re-rendering
2. **TypeScript Support**: Excellent TypeScript integration out of the box
3. **Bundle Size**: Small footprint (less than 3kb gzipped)
4. **Simplicity**: Easy to understand and maintain
5. **Flexibility**: Works well with both global and component-level state
6. **DevTools**: Excellent Redux DevTools integration
7. **Persistence**: Built-in persistence with localStorage/sessionStorage
8. **SSR Support**: Perfect for Next.js applications

### Store Structure

The state management is split into focused stores:

- **Auth Store** (`src/store/auth-store.ts`): Authentication, user data, tokens
- **App Store** (`src/store/app-store.ts`): UI state, cart, favorites, modals
- **Combined Hooks** (`src/store/index.ts`): Convenient hooks for common use cases

## Features

### 🔐 Authentication System

- **Multiple Auth Methods**: Email/password, social login ready
- **Secure Token Management**: JWT tokens with automatic refresh
- **Persistent Sessions**: Secure cookie-based token storage
- **User Profiles**: Complete user profile management
- **Role-Based Access**: Customer, business owner, admin roles
- **Session Management**: Automatic token refresh and logout

### 🛒 Shopping Cart

- **Persistent Cart**: Survives page refreshes and sessions
- **Real-time Updates**: Instant UI updates across components
- **Item Management**: Add, remove, update quantities
- **Business Context**: Cart items linked to specific businesses
- **Booking Context**: Support for appointment bookings in cart

### ❤️ Favorites System

- **Business Favorites**: Save and manage favorite businesses
- **Persistent Storage**: Favorites survive sessions
- **Quick Access**: Easy toggle on/off functionality
- **Sync Across Devices**: Ready for backend sync

### 🎨 Theme Management

- **System Theme**: Respects OS dark/light mode preference
- **Manual Override**: Users can force light or dark mode
- **Persistent Preference**: Theme choice saved across sessions
- **Real-time Updates**: Instant theme switching

### 🔄 Modal Management

- **Centralized Control**: All modals managed through store
- **Context Preservation**: Modal state survives navigation
- **Gated Actions**: Smart authentication-required actions
- **Deep Linking**: Modals can be triggered with context

## Getting Started

### 1. Installation

The required dependencies are already installed:

```bash
npm install zustand immer js-cookie jwt-decode @types/js-cookie
```

### 2. Setup Authentication Provider

Wrap your app with the authentication provider:

```tsx
// app/layout.tsx
import { AuthProvider } from '@/providers/auth-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### 3. Use in Components

```tsx
import { useAuth, useModal, useCart, useApp } from '@/store'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const { openAuthModal } = useModal()
  const { cartItems, addToCart } = useCart()
  const { theme, setTheme } = useApp()

  return (
    // Your component JSX
  )
}
```

## Authentication Usage

### Basic Authentication

```tsx
import { useAuth, useModal } from '@/store'

function LoginButton() {
  const { isAuthenticated } = useAuth()
  const { openAuthModal } = useModal()

  if (isAuthenticated) {
    return <span>Welcome!</span>
  }

  return (
    <button onClick={() => openAuthModal('login')}>
      Sign In
    </button>
  )
}
```

### Gated Actions

Use the `GatedActions` component for actions that require authentication:

```tsx
import GatedActions from '@/components/business/gated-actions'

function BusinessCard({ business }) {
  return (
    <div>
      <h3>{business.name}</h3>
      <GatedActions
        businessId={business.id}
        businessName={business.name}
        businessPhone={business.phone}
        actions={['save', 'book', 'message', 'call']}
      />
    </div>
  )
}
```

### Authentication Context

Use the authentication context for advanced auth requirements:

```tsx
import { useAuthContext } from '@/providers/auth-provider'

function ProtectedAction() {
  const { requireAuth, hasPermission } = useAuthContext()

  const handleAdminAction = () => {
    if (!hasPermission('admin_panel')) {
      alert('Insufficient permissions')
      return
    }
    
    // Proceed with admin action
  }

  const handleProtectedAction = () => {
    requireAuth(() => {
      // This runs only if user is authenticated
      console.log('User is authenticated!')
    }, 'custom_action', 'Business Name')
  }

  return (
    <div>
      <button onClick={handleProtectedAction}>
        Protected Action
      </button>
      <button onClick={handleAdminAction}>
        Admin Only
      </button>
    </div>
  )
}
```

## Component Integration

### Enhanced User Navigation

Replace the old `UserNav` component with the new enhanced version:

```tsx
// components/navigation/navigation.tsx
import EnhancedUserNav from '@/components/navigation/enhanced-user-nav'

function Navigation() {
  return (
    <nav>
      {/* Other nav items */}
      <EnhancedUserNav />
    </nav>
  )
}
```

### Enhanced Auth Modal

The new auth modal provides a complete authentication flow:

```tsx
import EnhancedAuthModal from '@/components/auth/enhanced-auth-modal'

// The modal is automatically included in EnhancedUserNav
// No need to manually include it unless you need multiple instances
```

## API Integration

### Backend Endpoints

Update these functions in `src/store/auth-store.ts` to integrate with your backend:

```typescript
const authAPI = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    
    if (!response.ok) {
      throw new Error('Login failed')
    }
    
    return response.json()
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    
    if (!response.ok) {
      throw new Error('Registration failed')
    }
    
    return response.json()
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    })
    
    if (!response.ok) {
      throw new Error('Token refresh failed')
    }
    
    return response.json()
  }
}
```

### Expected Backend API Response Format

```typescript
// Login/Register Response
interface AuthResponse {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    avatar?: string
    role: 'customer' | 'business_owner' | 'admin' | 'super_admin'
    status: 'active' | 'inactive' | 'suspended' | 'pending_verification'
    emailVerified: boolean
    phoneVerified: boolean
    businessId?: string
    preferences: UserPreferences
    createdAt: string
    updatedAt: string
  }
  business?: Business // For business owners
  tokens: {
    accessToken: string
    refreshToken: string
    expiresAt: number
  }
  message: string
}
```

## Security Considerations

### Token Storage

- **Development**: Tokens stored in cookies with `secure: false`
- **Production**: Use `httpOnly` cookies for access tokens
- **Refresh Tokens**: Store in `httpOnly` cookies with longer expiration

### Production Checklist

1. **Environment Variables**:

   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://your-domain.com
   ```

2. **Cookie Settings**:

   ```typescript
   // Update tokenUtils.setTokens for production
   Cookies.set('nexa_access_token', tokens.accessToken, {
     expires: new Date(tokens.expiresAt),
     secure: true,        // HTTPS only
     sameSite: 'strict',  // CSRF protection
     httpOnly: true       // XSS protection
   })
   ```

3. **API Security**:
   - Implement rate limiting for auth endpoints
   - Add CORS configuration
   - Use HTTPS in production
   - Implement proper error handling

## Performance Optimization

### Selective Subscriptions

Use specific selectors to avoid unnecessary re-renders:

```tsx
// ❌ Bad - subscribes to entire auth state
const authState = useAuthStore()

// ✅ Good - only subscribes to isAuthenticated
const isAuthenticated = useAuthStore(state => state.isAuthenticated)

// ✅ Even better - use provided hooks
const { isAuthenticated } = useAuth()
```

### Computed Values

Use the provided computed selectors:

```tsx
import { useCartTotal, useCartCount, useIsFavorite } from '@/store'

function CartSummary() {
  const cartTotal = useCartTotal()
  const cartCount = useCartCount()
  
  return (
    <div>
      {cartCount} items - ${cartTotal.toFixed(2)}
    </div>
  )
}
```

## Development Tools

### Redux DevTools

The stores are configured with Redux DevTools support:

1. Install Redux DevTools Extension
2. Open DevTools → Redux tab
3. Monitor state changes in real-time

### Debugging

Enable debug logging in development:

```typescript
// Add to store configuration
devtools(
  store,
  {
    name: 'nexa-auth-store',
    trace: true, // Enable action tracing
  }
)
```

## Testing

### Unit Testing

```tsx
import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '@/store/auth-store'

test('should login user', async () => {
  const { result } = renderHook(() => useAuthStore())
  
  await act(async () => {
    await result.current.login('user@example.com', 'password')
  })
  
  expect(result.current.isAuthenticated).toBe(true)
  expect(result.current.user?.email).toBe('user@example.com')
})
```

### Integration Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider } from '@/providers/auth-provider'
import MyComponent from './MyComponent'

test('should show auth modal on protected action', () => {
  render(
    <AuthProvider>
      <MyComponent />
    </AuthProvider>
  )
  
  fireEvent.click(screen.getByText('Save Business'))
  expect(screen.getByText('Welcome back to Nexa')).toBeInTheDocument()
})
```

## Migration Guide

### From React Context

1. **Replace Context Provider**:

   ```tsx
   // Before
   import { AuthProvider } from '@/components/auth/auth-provider'
   
   // After
   import { AuthProvider } from '@/providers/auth-provider'
   ```

2. **Update Hook Usage**:

   ```tsx
   // Before
   import { useAuth } from '@/components/auth/auth-provider'
   
   // After
   import { useAuth } from '@/store'
   ```

3. **Update Components**:
   - Replace `UserNav` with `EnhancedUserNav`
   - Replace `AuthModal` with `EnhancedAuthModal`
   - Update `GatedActions` imports

## Troubleshooting

### Common Issues

1. **Hydration Errors**:

   ```tsx
   // Wrap client-only code
   import dynamic from 'next/dynamic'
   
   const EnhancedUserNav = dynamic(() => import('@/components/navigation/enhanced-user-nav'), {
     ssr: false
   })
   ```

2. **Token Refresh Loops**:
   - Check token expiration logic
   - Ensure refresh endpoint is working
   - Verify token format

3. **State Not Persisting**:
   - Check localStorage permissions
   - Verify persistence configuration
   - Check for browser storage limits

### Debug Checklist

- [ ] Store is properly configured with devtools
- [ ] Persistence is working (check localStorage)
- [ ] Tokens are stored in cookies
- [ ] API endpoints return expected format
- [ ] Error handling is implemented
- [ ] Loading states are managed

## Future Enhancements

### Planned Features

1. **Multi-factor Authentication**: SMS/Email OTP support
2. **Social Login**: Google, Facebook, Twitter integration
3. **Biometric Auth**: Touch ID/Face ID on mobile
4. **Session Management**: Multiple device sessions
5. **Advanced Permissions**: Granular role-based access
6. **Offline Support**: Offline-first capabilities
7. **Analytics Integration**: User behavior tracking
8. **A/B Testing**: Feature flag support

### Extension Points

The system is designed to be easily extended:

- Add new stores for domain-specific state
- Extend user roles and permissions
- Add new authentication methods
- Implement additional security layers
- Add custom middleware for logging/analytics

---

## Support

For questions or issues with the authentication system:

1. Check this documentation first
2. Review the type definitions in `src/types/auth.ts`
3. Check the example components for usage patterns
4. Review the store implementations for logic details

The system is designed to be production-ready and scales with your application needs.
