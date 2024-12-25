"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import * as React from "react"
import { Settings2, ChevronRight, ChevronLeft, ChevronsLeft, Plus, ChevronsRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  enablePagination?: boolean
  enableScroll?: boolean
}

// Function to highlight text when matching with the search
function highlightText(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-custom-secondary">
        {part}
      </span>
    ) : (
      part
    )
  );
}


export function DataTable<TData, TValue>({columns, data, enablePagination = true, enableScroll= true}: DataTableProps<TData, TValue>) {

  const memoizedColumns = React.useMemo(() => columns, [columns]);
  const memoizedData = React.useMemo(() => data, [data]);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [searchValue, setSearchValue] = React.useState("")

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel(): undefined,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // ...(enablePagination && {getPaginationRowModel: getPaginationRowModel()}) // Only include pagination when enabled
  })

  // Conditional rendering based on pagination state
  const rowsToRender = enablePagination ? table.getRowModel().rows : memoizedData; // Show all rows if pagination is off

  return (
    <React.Fragment>
      {/* Search Bar and Utilities */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center justify-start space-x-2 ">
          {/* Search Value Selection */}
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              table.setGlobalFilter(event.target.value); // Use global filtering
            }}
            className="w-[16rem]"
          />
          {/* Add Entry Button */}
          <Button variant="outline" onClick={() => {}}>
            {/* <CirclePlus/> */}
            <Plus />
            Add
          </Button>
        </div>
        <div>
        {/* Dropdown Columns Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="">
                <Settings2/>
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <div className=""> */}
              <span className="block py-2 px-2 text-xs font-bold">Toggle Columns</span>
              {/* </div> */}
              <hr/>
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide() && column.id !== "actions" // Exclude "actions". Always on view
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-md border shadow">
      {/* Wrapper to handle fixed layout */}
      <div className="w-full table-fixed">
        <Table className="table-fixed">
          {/* Static Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>

      {/* Scrollable Body */}
      <div className={`${enableScroll? "max-h-[560px] overflow-y-auto" : ""}`}>
        <Table className="table-fixed">
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {typeof cell.getValue() === "string" ? (
                        highlightText(cell.getValue() as string, searchValue)
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>


      {/* Pagination Buttons if pagination enabled*/}
      {enablePagination && 
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
                  {[10, 15, 20, 30, 50].map((pageSize) => (
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
      }
    </React.Fragment>
  )
}
