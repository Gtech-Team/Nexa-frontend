export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-gray-800 relative">
    <div className="absolute inset-0 opacity-20">
      <div className="text-[16rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200 absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-12 select-none pointer-events-none">
        Nexa
      </div>
    </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-6">Find Connect Negotiate & Grow™</h3>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span className="text-xs">IG</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span className="text-xs">X</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span className="text-xs">LI</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Users</h4>
            <ul className="space-y-2 text-gray-400">
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

          <div>
            <h4 className="font-semibold mb-4">For Businesses</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  List a Business
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

          <div>
            <h4 className="font-semibold mb-4">Nexa</h4>
            <ul className="space-y-2 text-gray-600">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">2025 Nexa Group, Inc All Rights Reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-500">
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
