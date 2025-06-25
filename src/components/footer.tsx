import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-gray-800 relative">
      <div className="absolute inset-0 opacity-20">
        <div className="text-[300px] sm:text-12xl md:text-16xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200 absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-6 sm:-translate-y-12 select-none pointer-events-none">
          Nexa
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="text-center sm:text-left">
            <Image
                src="/nexa-favicon.png"
                alt="Nexa Logo"
                width={80}
                height={80}
                className="mx-auto sm:mx-0 mb-4 sm:mb-6 w-20 h-20 object-contain"
            />
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
              Nigeria&#39;s #1 AI-powered local commerce platform™.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">IG</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">X</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">LI</span>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4">For Users</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Explore Businesses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Discover Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Browse Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI Assistant
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4">For Businesses</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  List a Business
                </a>
              </li>
              <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Business Dashboard
                  </a>
                </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Growth Tools
                </a>
              </li>
            </ul>
          </div>

             <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>hello@nexa.ng</li>
                <li>+234 (0) 800 NEXA</li>
                <li>Port Harcourt, Nigeria</li>
              </ul>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 gap-4 sm:gap-0">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">2025 Nexa Group, Inc All Rights Reserved.</p>
          <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
