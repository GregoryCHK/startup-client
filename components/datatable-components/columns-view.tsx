import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

import { Settings2 } from 'lucide-react';

import { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface ColumnsViewProps<TData> {
    table: Table<TData>;
}

export function ColumnsView<TData>({table}: ColumnsViewProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  // Beta Version Comment
  // TODO: This is the current beta version of the column visibility feature.
  // Once user authentication and cookies are implemented, we'll replace the localStorage approach 
  // with a user-specific storage mechanism, so users can save their preferred column visibility 
  // settings across sessions. For now, we're storing column visibility in localStorage for testing.
  // Future Improvement: Update this with user profiles and cookies to make column visibility persistent per user.

  // Load saved visibility state from localStorage when the component mounts
  useEffect(() => {
    const savedVisibility = localStorage.getItem('columnVisibility');
    if (savedVisibility) {
      setColumnVisibility(JSON.parse(savedVisibility));
    }
  }, []);

  // Save column visibility state to localStorage when it changes
  useEffect(() => {
    if (Object.keys(columnVisibility).length > 0) {
      localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
    }

    // Apply column visibility changes to the table
    table.getAllColumns().forEach((column) => {
      const visibility = columnVisibility[column.id];
      if (visibility !== undefined) {
        column.toggleVisibility(visibility);
      }
    });
  }, [columnVisibility, table]);

  const handleToggleColumnVisibility = (columnId: string, value: boolean) => {
    setColumnVisibility((prevVisibility) => {
      const newVisibility = { ...prevVisibility, [columnId]: value };
      return newVisibility;
    });
  };
  
  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" >
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
                (column) => column.getCanHide() && column.id !== "actions" && column.id !== "info" // Exclude "actions". Always on view
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => handleToggleColumnVisibility(column.id, !!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
  );
}
