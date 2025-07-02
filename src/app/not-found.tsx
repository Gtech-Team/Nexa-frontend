import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-[#05BBC8] rounded-lg flex items-center justify-center">
            <Image src="/nexa-favicon.png" alt="Nexa Logo" width={32} height={32} className="object-contain" />
            </div>
          <span className="text-2xl font-semibold">Nexa</span>
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-black font-medium px-6">Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
