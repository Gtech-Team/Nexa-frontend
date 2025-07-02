# Quick Integration Guide

## Step 1: Update Root Layout

Replace your current layout with the new providers:

```tsx
// app/layout.tsx
import AppProviders from '@/providers/app-providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
```

## Step 2: Update Navigation Components

Replace the existing UserNav with the enhanced version:

```tsx
// In your navigation component
import EnhancedUserNav from '@/components/navigation/enhanced-user-nav'

// Replace any existing <UserNav /> with:
<EnhancedUserNav />
```

## Step 3: Update Business Components

Use the new GatedActions component:

```tsx
// In business cards/profiles
import GatedActions from '@/components/business/gated-actions'

// Replace old action buttons with:
<GatedActions
  businessId={business.id}
  businessName={business.name}
  businessPhone={business.phone}
  actions={['save', 'book', 'message', 'call']}
/>
```

## Step 4: Update Auth-Protected Routes

Use the new authentication hooks:

```tsx
// In protected pages
import { useAuth } from '@/store'
import { useAuthContext } from '@/providers/auth-provider'

function ProtectedPage() {
  const { isAuthenticated, user } = useAuth()
  const { requireAuth } = useAuthContext()

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>
  }

  return <div>Protected content for {user?.firstName}</div>
}
```

## Step 5: Remove Old Auth Components

After integration, you can safely remove:

- `src/components/auth/auth-provider.tsx` (old version)
- `src/components/auth/auth-modal.tsx` (old version)  
- `src/components/navigation/user-nav.tsx` (old version)
- `src/components/business/gated-actions.tsx` (old version)

## Testing the Integration

1. **Authentication Flow**: Try logging in/out
2. **Gated Actions**: Click actions while logged out
3. **State Persistence**: Refresh page while logged in
4. **Theme Switching**: Test light/dark mode
5. **Cart Functionality**: Add/remove items from cart
6. **Favorites**: Save/unsave businesses

## Key Benefits

✅ **Production-ready**: Secure token management and persistence
✅ **Type-safe**: Full TypeScript support with comprehensive types
✅ **Performance optimized**: Selective subscriptions prevent unnecessary re-renders
✅ **Scalable**: Easy to extend with new features and stores
✅ **Developer friendly**: Excellent DevTools integration and debugging
✅ **Mobile ready**: Responsive design and touch-friendly interactions
