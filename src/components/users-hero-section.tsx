import Image from "next/image"
import { MessageCircle } from "lucide-react"

export default function UsersHeroSection() {
  return (
    <section className="relative pt-20 pb-32 px-6">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
          Nigeria&#39;s
          <br />
          <span className="text-[#05BBC8]">#1 AI <span className="italic underline">local</span> </span>
          <br />
          multi-business engine
        </h1>

        <div className="mb-16">
          <Image
            src="/nexa-board1.png"
            alt="AI-Powered Local Discovery Interface"
            width={1200}
            height={400}
            className="max-w-4xl mx-auto rounded-2xl shadow-2xl"
            priority
          />
        </div>

        {/* Floating Stats */}
        <div className="relative">
          <div className="absolute -left-20 top-10 bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#05BBC8] rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">826</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-16 top-20 bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">424</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 mb-8">Add your business to the conversation.</p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <MessageCircle className="w-4 h-4" />
          <span>15,234 conversations</span>
        </div>
      </div>
    </section>
  )
}
