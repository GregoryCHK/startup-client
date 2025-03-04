import { Table } from '@tanstack/react-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface DataTablePaginationProps<TData>{
    table: Table<TData>;
}

export function DataTablePagination<TData>({table} : DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between">
        {/* Page Count */}
        <div className="px-2 text-xs text-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "} {table.getPageCount()}
        </div>
        {/* Pagination Buttons on the right */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex items-center space-x-4">
              <span className="text-xs">Rows per page:</span>
              {/* Rows Per Page Selector */}
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {table.setPageSize(Number(value))}} // Update pageSize state
              >
                <SelectTrigger className="w-[4rem] text-xs py-2 hover:text-custom">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent>
                  {[15, 20, 30, 50].map((pageSize) => (
                    <SelectItem className="focus:text-custom" key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft/>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight/>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
    </div>
  )
}
