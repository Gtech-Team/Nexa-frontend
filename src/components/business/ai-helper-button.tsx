import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog"
import { Sparkles, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function AIHelperButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [customInput, setCustomInput] = useState("")

  const helpOptions = [
    "Find the best restaurant for a date",
    "Book a hotel for a business trip",
    "Find reliable car repair service",
    "Discover beauty salons nearby",
    "Plan entertainment for weekend",
    "Find affordable accommodation",
  ]

  const handleSubmit = () => {
    const query = customInput || selectedOption
    if (!query) return
    alert(`AI is processing: "${query}"`)
    setIsOpen(false)
    setCustomInput("")
    setSelectedOption("")
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#05BBC8] hover:bg-[#049aa5] text-white rounded-full w-14 h-14 shadow-xl z-50"
      >
        <Sparkles className="w-6 h-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />

          {/* Custom floating panel at bottom right */}
          <div
            className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 w-[90%] max-w-sm bg-white border border-[#05BBC8] rounded-xl shadow-xl z-50 p-4"
            style={{ boxShadow: "0 8px 32px rgba(5, 187, 200, 0.15)" }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[#05BBC8] font-semibold flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" />
                Ask Nexa-AI
              </h2>
              <DialogClose
                className="text-gray-400 hover:text-red-500"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </DialogClose>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              Get instant, personalized help for your local needs.
            </p>

            <Textarea
              placeholder="Or type your request here..."
              className="text-sm mb-3"
              value={customInput}
              onChange={(e) => {
                setCustomInput(e.target.value)
                setSelectedOption("")
              }}
            />

            <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
            {helpOptions.map((option) => (
                <Button
                    key={option}
                    variant={selectedOption === option ? "default" : "outline"}
                    className={`w-full justify-start h-auto text-left text-xs px-3 py-2 ${
                        selectedOption === option
                            ? "bg-[#05BBC8] text-white"
                            : "border-gray-300 text-gray-800"
                    }`}
                    onClick={() => {
                        setSelectedOption(option)
                        setCustomInput("")
                    }}
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                >
                    {option}
                </Button>
            ))}
            </div>

            <Button
              className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-white text-sm"
              disabled={!customInput && !selectedOption}
              onClick={handleSubmit}
            >
              Get Recommendations
            </Button>
          </div>
        </DialogPortal>
      </Dialog>
    </>
  )
}
