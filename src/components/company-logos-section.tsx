const companies = [
  "Shoprite",
  "Chicken Republic",
  "Tantalizers",
  "Mr. Biggs",
  "Domino's Pizza",
  "KFC",
  "Sweet Sensation",
  "Genesis Deluxe",
  "Transcorp Hilton",
  "Sheraton Hotels",
]

export default function CompanyLogosSection() {
  return (
    <section className="py-6 sm:py-8 border-t border-gray-800">
      <div className="overflow-hidden">
        <div className="flex animate-scroll space-x-8 sm:space-x-12 items-center">
          {companies.map((company, index) => (
            <div key={index} className="text-gray-500 font-medium whitespace-nowrap text-sm sm:text-base">
              {company}
            </div>
          ))}
          {/* Duplicate for seamless scroll */}
          {companies.map((company, index) => (
            <div key={`duplicate-${index}`} className="text-gray-500 font-medium whitespace-nowrap text-sm sm:text-base">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
