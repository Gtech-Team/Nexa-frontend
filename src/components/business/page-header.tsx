import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


interface PageHeaderProps {
    favoritesCount?: number
    title?: string
    variant?: "default" | "black"
}

export default function PageHeader({
    favoritesCount,
    title,
    variant = "default",
}: PageHeaderProps) {
    if (variant === "black") {
        return (
            <header className="border-b border-gray-800 sticky top-0 z-40 bg-black/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3 sm:space-x-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="underline">Back</span>
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="flex items-center space-x-2 sm:space-x-3 pl-2">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center pl-2">
                                    <Image
                                        src="/nexa-favicon.png"
                                        alt="Nexa Logo"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                    <span className="text-lg sm:text-xl font-semibold text-white">Nexa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="hidden sm:inline text-lg sm:text-xl items-center text-center font-semibold text-white">
                        {title || "Find a Business"}
                    </span>
                        <div className="flex items-center space-x-4">
                            <Link href="/business-login">
                                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                                    Already listed? Log in
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="underline">Back</span>
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="flex items-center space-x-2 sm:space-x-3 pl-2">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center pl-2">
                                    <Image
                                        src="/nexa-favicon.png"
                                        alt="Nexa Logo"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                    <span className="text-lg sm:text-xl font-semibold text-black">Nexa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="hidden sm:inline text-lg sm:text-xl items-center text-center font-semibold text-gray-900">
                        {title || "Find a Business"}
                    </span>
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-[#05BBC8] border-[#05BBC8] text-xs sm:text-sm">
                            {favoritesCount} Saved
                        </Badge>
                        <Link href="/user-login">
                            <Button variant="ghost" size="icon" className="ml-2" title="Login or Register">
                                {/* Lucide User Icon */}
                                <span className="sr-only">Login or Register</span>
                                <User className="w-12 h-12 text-gray-500" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
