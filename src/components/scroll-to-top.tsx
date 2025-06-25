import { ChevronUp } from "lucide-react"

export default function ScrollToTop() {
  return (
    <button
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-700 transition-colors shadow-lg"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  )
}
