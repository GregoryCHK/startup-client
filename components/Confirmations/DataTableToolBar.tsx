import { Table } from '@tanstack/react-table';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';


import { Plus, Settings2 } from 'lucide-react';

interface DataTableToolBarProps<TData>{
    table: Table<TData>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTableToolBar<TData>({table, searchValue, setSearchValue} : DataTableToolBarProps<TData>) {

    
  return (
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
  )
}
