import * as React from "react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Check, CirclePlus, Search } from "lucide-react";
import { Input } from "../ui/input";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValue = column?.getFilterValue() as string | undefined;
  
  // State to control popover open/close
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = React.useState("");

  const handleSelectOption = (optionValue: string) => {
    if (!column) return;
    
    // Set the selected value (only one at a time)
    column.setFilterValue(selectedValue === optionValue ? undefined : optionValue);
  };

  const handleResetFilter = () => {
    column?.setFilterValue(undefined);
    setOpen(false); // Close the popover when reset is clicked
  };
  // Filter options based on search input
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <CirclePlus className="mr-2 h-4 w-4" />
          {title}
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValue}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {options.find(option => option.value === selectedValue)?.label}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="pt-2">
          <div className="flex items-center pb-2 border-b">
          <Search className="ml-4 text-foreground/50" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-2 w-full rounded-none border-none shadow-none focus-visible:ring-0"
          />
          </div>
          <div className="p-2 space-y-2">
            {/* Use filteredOptions instead of options */}
            {filteredOptions.map((option) => {
              const isSelected = selectedValue === option.value;

              const count = facets?.get(option.value.charAt(0).toUpperCase() + option.value.slice(1)) || 0;

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelectOption(option.value)}
                  className={cn(
                    "flex items-center p-2 cursor-pointer rounded-sm text-sm hover:bg-muted hover:text-foreground",
                    isSelected ? " text-foreground hover:bg-muted" : ""
                  )}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-custom",
                      isSelected
                        ? "bg-custom text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {isSelected && <Check className="h-4 w-4" />}
                  </div>
                  {option.icon && (
                    <option.icon className="mx-2 h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={!option.icon ? "ml-2" : ""}>{option.label}</span>
                  {/* Display the count dynamically from facets */}
                  {count !== undefined && (
                    <span className="ml-auto font-sans text-muted-foreground ">
                      {count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {selectedValue && (
            <div className="mt-2 p-1 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilter}
                className="w-full rounded-none "
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
