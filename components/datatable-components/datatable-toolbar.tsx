import { Table } from '@tanstack/react-table';
import { ColumnsView } from './columns-view'; 

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
      {/* Search Value Selection */}
      <div className="flex items-center justify-start space-x-2 ">
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
      {/* Columns View Menu */}
      <div>
        <ColumnsView table={table}/>
      </div>
    </div>
  )
}
