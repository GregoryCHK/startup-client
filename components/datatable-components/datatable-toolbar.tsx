"use state";

import { Table } from '@tanstack/react-table';
import { useState } from 'react';

import { ColumnsView } from './columns-view'; 
import BasicModal from '../basic-modal';
import AddConfirmation from '@/app/confirmations/add-confirmation';
import { DataTableFacetedFilter } from './datatable-faceted-filter';
import { priorities, status } from '@/types/confirmations';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { Plus, X } from 'lucide-react';
import { CsvExportButton } from './csv-export-button';
import { Separator } from '../ui/separator';


interface DataTableToolBarProps<TData>{
    table: Table<TData>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTableToolBar<TData>({table, searchValue, setSearchValue} : DataTableToolBarProps<TData>) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFiltered = table.getState().columnFilters.length > 0;
 
  return (
    <>
    <div className="mb-2 flex items-center justify-between">
      {/* Search Value Selection and Filtering */}
      <div className="flex items-center justify-start space-x-2 ">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
            table.setGlobalFilter(event.target.value); // Use global filtering
          }}
          className="w-[16rem] transition-none"
        />
        {/* Filters */}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
            
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={status}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-7 text-sm"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {/* Add Entry Button */}
        <Button className='bg-custom text-sm hover:bg-custom-secondary' onClick={() => setIsModalOpen((prev) => !prev)}>
          <Plus />
          Add
        </Button>
        {/* Vertical Seperator */}
        <Separator orientation="vertical" className="h-6" />
        {/* Columns View Menu */}
        <div>
          <ColumnsView table={table}/>
        </div>
        {/* Download CSV Button */}
        <CsvExportButton table={table} filename="confirmations"/>
      </div>
    </div>
    
    <BasicModal isOpen={isModalOpen} onClose={() => setIsModalOpen((prev) => !prev)} title={"Add New Confirmation"}>
      <AddConfirmation onClose={() => setIsModalOpen((prev) => !prev)}/>
    </BasicModal>
    </>
  )
}
