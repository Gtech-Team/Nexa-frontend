import { ChevronUp } from "lucide-react"

export default function ScrollToTop() {
  return (
    <button
      className="fixed bottom-8 right-8 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-700 transition-colors"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
}
