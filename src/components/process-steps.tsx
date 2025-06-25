interface Step {
  number: string
  title: string
  description: string
}

interface ProcessStepsProps {
  steps: Step[]
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
      {steps.map((step, index) => (
        <div
          key={index}
          className="text-center transition-transform transform hover:-translate-y-2"
        >
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#05BBC8] shadow-[0_0_0_4px_rgba(5,187,200,0.15)]">
            <span className="text-white font-bold">{step.number}</span>
          </div>
          <div className="rounded-2xl border-2 border-[#05BBC8] bg-gray-900 p-6 shadow-lg hover:shadow-[0_4px_24px_0_rgba(5,187,200,0.25)] transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-[#05BBC8]">{step.title}</h3>
            <p className="text-gray-300 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
