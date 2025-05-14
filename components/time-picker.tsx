import { useState } from "react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"
import { ClockIcon } from "lucide-react"

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0")); // 00, 05, ..., 55

export default function TimePicker({
  className,
  value,
  onChange,
  placeholder,
  readOnly,
}: {
  className?: string,
  value?: string // format: "HH:mm"
  onChange: (time?: string) => void
  placeholder: string
  readOnly: boolean
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (h: string, m: string) => {
    const selectedTime = `${h}:${m}`
    onChange(selectedTime)
    setOpen(false)
  };

  const [selectedHour, selectedMinute] = value?.split(":") ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-auto font-normal gap-1 focus:ring-custom focus:ring-2",
            !value && "text-muted-foreground",
            className
          )}
          disabled={readOnly}
        >
            <ClockIcon className="mr-1 h-4 w-4" />
            <span className={cn(!value && "text-muted-foreground", readOnly && "text-foreground", "mt-[2px]")}>
            {value || placeholder}
            </span>        
        </Button>
      </PopoverTrigger>

      {!readOnly && (
        <PopoverContent className="w-auto p-4 flex gap-3" align="center">
          <div className="flex flex-col max-h-[200px] overflow-auto pr-2 ">
            {hours.map((h) => (
              <button
                key={h}
                className={cn(
                  "px-2 py-1 text-left hover:bg-accent rounded text-sm",
                  selectedHour === h && "bg-muted font-medium"
                )}
                onClick={() => handleSelect(h, selectedMinute || "00")}
              >
                {h}
              </button>
            ))}
          </div>
          <div className="flex flex-col max-h-[200px] overflow-auto pr-2 ">
            {minutes.map((m) => (
              <button
                key={m}
                className={cn(
                  "px-2 py-1 text-left hover:bg-accent rounded text-sm",
                  selectedMinute === m && "bg-muted"
                )}
                onClick={() => handleSelect(selectedHour || "00", m)}
              >
                {m}
              </button>
            ))}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
