import { ReactNode } from "react"

interface BusinessLayoutProps {
  children: ReactNode
}

export default function BusinessLayout({ children }: BusinessLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
