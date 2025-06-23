export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#05BBC8] rounded-lg flex items-center justify-center animate-pulse">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="text-xl font-semibold text-white">Loading...</span>
      </div>
    </div>
  )
}
