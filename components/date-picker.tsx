import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";

export default function DatePicker({className, value, onChange, placeholder, readOnly, }: {className?:string, value?: Date; onChange: (date?: Date) => void; placeholder: string; readOnly: boolean; }) {
  const [open, setOpen] = useState(false); // State to control popover visibility

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-auto justify-start text-left font-normal focus:ring-custom focus:ring-2",
            !value && "text-muted-foreground",
            className
          )}
          disabled={readOnly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className={cn(!value && "text-muted-foreground", readOnly && "text-foreground", "mt-[3px]")}>
            {value ? format(value, "dd MMM yy") : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      {!readOnly && ( // Only show the calendar when not in read-only mode
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false); // Close the popover when a date is selected
            }}
            initialFocus
          />
        </PopoverContent>
      )}
    </Popover>
  );
}
