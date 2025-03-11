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
import { useState } from "react";

export default function DatePicker({ value, onChange, placeholder }: { value?: Date; onChange: (date?: Date) => void; placeholder: string }) {
  const [open, setOpen] = useState(false); // State to control popover visibility

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-auto justify-start text-left font-normal focus:ring-custom focus:ring-2",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "dd MMM yy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
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
    </Popover>
  );
}
