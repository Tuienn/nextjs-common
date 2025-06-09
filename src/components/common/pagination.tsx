import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface Props {
  page: number
  total_page: number
  handleChangePage: (page: number) => void
}

const CommonPagination = ({ page, total_page, handleChangePage }: Props) => {
  // Helper function to generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []

    if (total_page <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= total_page; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (page <= 4) {
        // Show pages 2, 3, 4, 5 and ellipsis
        for (let i = 2; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(total_page)
      } else if (page >= total_page - 3) {
        // Show ellipsis and last 5 pages
        pages.push('ellipsis')
        for (let i = total_page - 4; i <= total_page; i++) {
          pages.push(i)
        }
      } else {
        // Show ellipsis, current page area, ellipsis
        pages.push('ellipsis')
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(total_page)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className='mt-4'>
      <Pagination className='md:justify-end'>
        <PaginationContent>
          <PaginationItem className='cursor-pointer'>
            <PaginationPrevious
              onClick={() => page > 1 && handleChangePage(page - 1)}
              className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, index) => (
            <PaginationItem key={index} className='cursor-pointer'>
              {pageNum === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink onClick={() => handleChangePage(pageNum)} isActive={pageNum === page}>
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem className='cursor-pointer'>
            <PaginationNext
              onClick={() => page < total_page && handleChangePage(page + 1)}
              className={page >= total_page ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default CommonPagination
