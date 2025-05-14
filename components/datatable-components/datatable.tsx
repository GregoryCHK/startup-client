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
  getFacetedRowModel,
  getFacetedUniqueValues,
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
import { useEffect } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowClassName?: string,
  cellClassName?: string,
  headerClassName?: string,
  enablePagination?: boolean;
  enableScroll?: boolean;
  enableToolBar?: boolean;
}

// Function to highlight text when matching with the search TODO: DOESNT WORK NEED TO WATCH IT LATER
// function highlightText(text: string, query: string) {
//   if (!query) return text;

//   const regex = new RegExp(`(${query})`, "gi");
//   const parts = text.split(regex);

//   return parts.map((part, index) =>
//     regex.test(part) ? (
//       <span key={index} className="bg-custom-secondary">
//         {part}
//       </span>
//     ) : (
//       part
//     )
//   );
// };

export function DataTable<TData, TValue>({columns, data, rowClassName = "", cellClassName= "", headerClassName= "", enablePagination=true, enableScroll=true, enableToolBar=true}: DataTableProps<TData, TValue>) {

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
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 15,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel(): undefined,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
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
        <div className="relative w-full max-h-[77vh] overflow-y-auto">  {/* max-h-[75vh] the original. if something's wrong set 75vh */}
          <Table>
            {/* Static Header */}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className={`py-2 ${headerClassName}`}>
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
                    className={rowClassName}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={cellClassName}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
