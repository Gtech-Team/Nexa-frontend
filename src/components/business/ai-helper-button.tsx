import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sparkles } from "lucide-react"

export default function AIHelperButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")

  const helpOptions = [
    "Find the best restaurant for a date",
    "Book a hotel for business trip",
    "Find reliable car repair service",
    "Discover beauty salons nearby",
    "Plan entertainment for weekend",
    "Find affordable accommodation",
  ]

  const handleGetRecommendations = () => {
    // TODO: Integrate with actual AI recommendation API
    alert(
      `AI is analyzing your request: "${selectedOption}". This would lead to personalized recommendations!`,
    )
    setIsOpen(false)
    setSelectedOption("")
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 bg-[#05BBC8] hover:bg-[#049aa5] text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg z-50"
            size="lg"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#05BBC8]" />
              <span>Help Me Choose</span>
            </DialogTitle>
            <DialogDescription>
              What do you need help with? Our AI will provide personalized recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 sm:space-y-3">
            {helpOptions.map((option) => (
              <Button
                key={option}
                variant={selectedOption === option ? "default" : "outline"}
                className={`w-full justify-start text-left h-auto p-2 sm:p-3 text-xs sm:text-sm ${
                  selectedOption === option ? "bg-[#05BBC8] hover:bg-[#049aa5]" : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-white mt-4 text-sm"
            disabled={!selectedOption}
            onClick={handleGetRecommendations}
          >
            Get AI Recommendations
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
