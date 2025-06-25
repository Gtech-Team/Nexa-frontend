import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export default function Pagination({ currentPage, totalPages, onPageChange, isLoading = false }: PaginationProps) {
  if (totalPages <= 1) return null

  const renderPageNumbers = () => {
    const pages = []
    const showPages = 5 // Number of page buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    const endPage = Math.min(totalPages, startPage + showPages - 1)

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          className={`w-8 h-8 sm:w-10 sm:h-10 p-0 text-xs sm:text-sm ${
            i === currentPage ? "bg-[#05BBC8] hover:bg-[#049aa5] text-white" : ""
          }`}
          onClick={() => onPageChange(i)}
          disabled={isLoading}
        >
          {i}
        </Button>
      )
    }

    return pages
  }

  return (
    <div className="flex justify-center mt-8 sm:mt-12">
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4"
        >
          Previous
        </Button>
        
        {/* Show first page if not in range */}
        {currentPage > 3 && (
          <>
            <Button
              variant="outline"
              className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-xs sm:text-sm"
              onClick={() => onPageChange(1)}
              disabled={isLoading}
            >
              1
            </Button>
            {currentPage > 4 && <span className="text-gray-400">...</span>}
          </>
        )}

        {renderPageNumbers()}

        {/* Show last page if not in range */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="text-gray-400">...</span>}
            <Button
              variant="outline"
              className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-xs sm:text-sm"
              onClick={() => onPageChange(totalPages)}
              disabled={isLoading}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
