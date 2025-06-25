import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function UsersHeroSection() {
  return (
    <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
          Nigeria&#39;s
          <br />
          <span className="text-[#05BBC8]">
            #1 AI <span className="italic underline">local</span>{" "}
          </span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            multi-business engine
          </span>
        </h1>

        <div className="mb-12 sm:mb-16">
          <Image
            src="/nexa-board1.png"
            alt="AI-Powered Local Discovery Interface"
            width={1200}
            height={400}
            className="w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto rounded-lg sm:rounded-2xl shadow-2xl"
            priority
          />
        </div>

        {/* Floating Stats - Hidden on mobile, visible on tablet+ */}
        <div className="relative">
          <div className="hidden md:block absolute -left-20 top-10 bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#05BBC8] rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">826</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute -right-16 top-20 bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">424</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Add your business to the community.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs sm:text-sm">
          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>15,234 conversations</span>
        </div>

        {/* Transition Divider */}

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          {" "}
          <svg
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            className="w-full h-[45px] fill-black"
          >
            {" "}
            <path d="M1200 0L0 0 0 100 1200 0z" />{" "}
          </svg>{" "}
        </div>
      </div>
    </section>
  );
}
