# Quick Auth Modal Reference

## How to Trigger Authentication Modals

### Basic Import
```typescript
import { useAuth } from "@/components/auth/auth-provider"
```

### Simple Auth Trigger
```typescript
const { showAuthModal } = useAuth()

// Basic login/signup modal
showAuthModal()
```

### Context-Aware Auth Trigger
```typescript
const { showAuthModal } = useAuth()

// For specific business actions
showAuthModal("save", "Business Name")      // Save/favorite business
showAuthModal("book", "Business Name")      // Book appointment  
showAuthModal("order", "Business Name")     // Place order
showAuthModal("review", "Business Name")    // Leave review
showAuthModal("negotiate", "Business Name") // Price negotiation
showAuthModal("message", "Business Name")   // Message vendor
```

### Check Authentication Status
```typescript
const { isAuthenticated, user } = useAuth()

if (!isAuthenticated) {
  showAuthModal("save", businessName)
  return
}

// User is authenticated, proceed with action
console.log(`User ${user.name} is authenticated`)
```

### Complete Example
```typescript
import { useAuth } from "@/components/auth/auth-provider"

function SaveBusinessButton({ businessName }: { businessName: string }) {
  const { isAuthenticated, showAuthModal } = useAuth()
  
  const handleSave = () => {
    if (!isAuthenticated) {
      showAuthModal("save", businessName)
      return
    }
    
    // User is authenticated, save the business
    console.log(`Saving ${businessName}...`)
  }
  
  return (
    <button onClick={handleSave} className="cursor-pointer">
      Save Business
    </button>
  )
}
```

## Pre-built Components

### Use GatedActions for Common Interactions
```typescript
import GatedActions from "@/components/business/gated-actions"

<GatedActions 
  businessName="Restaurant Name"
  actions={["save", "message", "book"]}
/>
```

### User Navigation Component
The auth modal is already integrated in the main navigation (`UserNav` component).

## Authentication Flow
1. User clicks action → `showAuthModal()` called
2. Modal opens with context (if provided)
3. User enters phone → OTP sent
4. User enters OTP → Verified
5. New users: Profile setup
6. Authentication complete → Modal closes
7. Original action can now proceed

## Available Action Icons & Text
- `"save"` → ❤️ "save this business"
- `"negotiate"` → 💬 "start price negotiation"  
- `"book"` → 📅 "book an appointment"
- `"order"` → 🛒 "place an order"
- `"review"` → ⭐ "leave a review"
- `"message"` → 💬 "message the vendor"
- `undefined` → ✨ "continue"

## That's it! 
The authentication system is fully integrated and ready to use throughout your app.
