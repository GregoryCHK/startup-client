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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import * as React from "react";

import { DataTablePagination } from "./datatable-pagination";
import {DataTableToolBar} from "./datatable-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enablePagination?: boolean;
  enableScroll?: boolean;
  enableToolBar?: boolean;
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


export function DataTable<TData, TValue>({columns, data, enablePagination=true, enableScroll=true, enableToolBar=true}: DataTableProps<TData, TValue>) {

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
      {enableToolBar && <DataTableToolBar table={table} searchValue={searchValue} setSearchValue={setSearchValue}/>}
      {/* Table */}
      <div className="rounded-md border shadow">
        {/* Wrapper to handle fixed layout */}
        <div className="relative w-full max-h-[670px] overflow-y-auto">
          <Table>
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-2 [&:last-child]:h-full [&:last-child]:border-l [&:last-child]:px-0 [&:last-child]:py-0">
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
      {enablePagination && <DataTablePagination table={table}/>}
    </React.Fragment>
  )
}
