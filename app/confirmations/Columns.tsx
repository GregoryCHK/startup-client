"use client"

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronsUpDown, CircleArrowRight } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of the data.
// You can use a Zod schema here if you want.
export type Confirmation = {
  id: number;
  channel: string;
  name: string;
  email: string;
  contact: string;
  start: Date;
  end: Date;
  priority: string;
  status: string;
}

// Custom function to format dates
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}


export const Columns: ColumnDef<Confirmation>[] = [
  {
    accessorKey: "channel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Channel
          <ChevronsUpDown className="ml-[1px] h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "start",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start
          <ChevronsUpDown className="ml-[1px] h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {const date = new Date(row.original.start);
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
  
      return formattedDate;},
  },
  {
    accessorKey: "end",
    header: "End",
    cell: ({ row }) => {const date = new Date(row.original.end);
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
  
      return formattedDate;
    },
  },
  {
    
    header:"Priority",
    cell: ({ row }) => {
      type Priority = "High" | "Medium" | "Low";

      const confirmation = row.original;
      
      // State to manage priority selection
      const [priority, setPriority] = useState<Priority>(confirmation.priority as Priority);
  
      // Define styles for each priority level
      const priorityColors = {
        High : "bg-red-500 hover:bg-red-600 text-white",
        Medium : "bg-yellow-500 hover:bg-yellow-600 text-black",
        Low : "bg-green-500 hover:bg-green-600 text-white",
      };
  
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={`w-24 ${priorityColors[priority] || "bg-gray-300 text-black"}`}>
              {priority}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className="">Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setPriority("High")}>
              High 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriority("Medium")}>
              Medium 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriority("Low")}>
              Low 
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )  
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronsUpDown className="ml-[1px] h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const confirmation = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(confirmation.name)}
            >
              Copy Confirmation ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: "info",
    header: "",
    cell: ({ row }) => {
      return(
        <Link className="flex justify-center p-2" href={''}>
          <CircleArrowRight className="h-5 w-5" strokeWidth={1.5}/>
        </Link>
      )
    },
  },
]
