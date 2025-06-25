export default function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <svg className="absolute inset-0 w-full h-full opacity-5 sm:opacity-10" viewBox="0 0 1200 800">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" className="sm:w-60 sm:h-60">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#05BBC8" strokeWidth="2" className="sm:stroke-[3px]" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}
