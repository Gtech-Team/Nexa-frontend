import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  favoritesCount: number
  title: string
}

export default function PageHeader({ favoritesCount }: PageHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#05BBC8] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">N</span>
              </div>
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Find a Business</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-[#05BBC8] border-[#05BBC8] text-xs sm:text-sm">
              {favoritesCount} Saved
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
