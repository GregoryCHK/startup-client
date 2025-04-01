"use client"

import { useState } from "react"
import { Download, Filter, Database, ChevronDown } from "lucide-react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CsvExportButtonProps<TData> {
  table: Table<TData>;
  filename?: string;
  className?: string;
}

export function CsvExportButton<TData>({ table, filename = "confirmations", className }: CsvExportButtonProps<TData>) {
  const [isExporting, setIsExporting] = useState(false);

  // Function to generate CSV from data with visible columns (for filtered export)
  const generateFilteredCSV = (data: any[]) => {
    // Get all columns that are currently visible
    debugger

    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible())
      .map((column) => ({
        id: column.id,
        header: typeof column.columnDef.header === "string" ? column.columnDef.header : document.getElementById(column.id+"_button")?.innerText,
      }));

    // Create CSV header row
    const headers = visibleColumns
      .filter((column) => column.id !== "actions" && column.id !== "info") // Exclude action columns
      .map((column) => `"${column.header || column.id}"`);

    // Create CSV rows
    const rows = data.map((item) => {
      return visibleColumns
        .filter((column) => column.id !== "actions" && column.id !== "info") // Exclude action columns
        .map((column) => {
          const value = item[column.id];

          // Handle different value types
          if (value === null || value === undefined) {
            return '""';
          }

          // Format dates
          if (column.id === "startDate" || column.id === "endDate") {
            if (value instanceof Date || (typeof value === "string" && !isNaN(Date.parse(value)))) {
              const date = new Date(value);
              return `"${date.toLocaleDateString()}"`;
            }
          }

          // Handle objects and arrays
          if (typeof value === "object") {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }

          // Handle strings with commas and quotes
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",");
    });

    // Combine headers and rows
    return [headers.join(","), ...rows].join("\n");
  };

  // Function to generate CSV from raw data with all columns
  const generateRawCSV = (data: any[]) => {
    // For raw data, we'll use all columns from the table definition
    const allColumns = table.getAllColumns().map((column) => ({
      id: column.id,
      header: typeof column.columnDef.header === "string" ? column.columnDef.header : document.getElementById(column.id+"_button")?.innerText,
    }));

    // Create CSV header row - exclude action columns
    const headers = allColumns
      .filter((column) => column.id !== "actions" && column.id !== "info")
      .map((column) => `"${column.header || column.id}"`);

    // Create CSV rows
    const rows = data.map((item) => {
      return allColumns
        .filter((column) => column.id !== "actions" && column.id !== "info")
        .map((column) => {
          const value = item[column.id];

          // Handle different value types
          if (value === null || value === undefined) {
            return '""';
          }

          // Format dates
          if (column.id === "startDate" || column.id === "endDate") {
            if (value instanceof Date || (typeof value === "string" && !isNaN(Date.parse(value)))) {
              const date = new Date(value);
              return `"${date.toLocaleDateString()}"`;
            }
          }

          // Handle objects and arrays
          if (typeof value === "object") {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }

          // Handle strings with commas and quotes
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",");
    });

    // Combine headers and rows
    return [headers.join(","), ...rows].join("\n");
  };

  // Function to download CSV
  const downloadCSV = (csv: string, filenameSuffix: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);

    // Add suffix to filename
    link.setAttribute("download", `${filename}_${filenameSuffix}.csv`); // Fixed filename suffix
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export with filters applied
  const handleExportFiltered = () => {
    try {
      setIsExporting(true);

      // Get the filtered data
      const filteredData = table.getFilteredRowModel().rows.map((row) => row.original);

      // Generate and download CSV with visible columns
      const csv = generateFilteredCSV(filteredData);
      downloadCSV(csv, "filtered"); // Changed to "filtered" suffix
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Export raw data without filters
  const handleExportRaw = () => {
    try {
      setIsExporting(true);

      // Access the original data directly from the table options
      const rawData = table.options.data;

      // Generate and download CSV with all columns
      const csv = generateRawCSV(rawData);
      downloadCSV(csv, "all"); // Changed to "all" suffix
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // For debugging - log the data structure
  // const debugExport = () => {
  //   console.log("Table options data:", table.options.data);
  //   console.log(
  //     "All columns:",
  //     table.getAllColumns().map((col) => col.id),
  //   );
  //   console.log(
  //     "Visible columns:",
  //     table.getVisibleLeafColumns().map((col) => col.id),
  //   );
  //   console.log("Filtered rows:", table.getFilteredRowModel().rows.length);
  //   console.log("First filtered row:", table.getFilteredRowModel().rows[0]?.original);
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className} disabled={isExporting}>
          {isExporting ? (
            <>
              <div className="h-4 w-4  rounded-full mr-2" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportFiltered}>
          <Filter className="mr-2 h-4 w-4" />
          Export Filtered Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportRaw}>
          <Database className="mr-2 h-4 w-4" />
          Export All Data
        </DropdownMenuItem>
        {/* Debug option - remove in production */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem onClick={debugExport} className="text-xs text-muted-foreground">
          Debug (check console)
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
