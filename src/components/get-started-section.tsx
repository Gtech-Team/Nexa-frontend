import { Button } from "@/components/ui/button"
import Link from "next/link";




export default function GetStartedSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-22 px-4 sm:px-6 relative bg-gradient-to-r from-[#05BBC8] to-blue-100">

      <div className="max-w-6xl mx-auto relative z-10">
       {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#05BBC8] to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Our AI-powered search helps you discover the perfect business for your needs
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/find-business" className="flex flex-col sm:flex-row items-center justify-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button className="bg-white text-[#05BBC8] hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold">
                      🤖 Ask AI Assistant
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold bg-transparent"
                    >
                      Browse All Categories
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
