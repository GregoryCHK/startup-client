import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

import { Settings2 } from 'lucide-react';

import { Table } from '@tanstack/react-table';

interface ColumnsViewProps<TData> {
    table: Table<TData>;
}

export function ColumnsView<TData>({table}: ColumnsViewProps<TData>) {
  return (
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
  );
}
