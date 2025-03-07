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
import BasicModal from "@/components/basic-modal";
import ConfirmationDetails from "./confirmation-details";

// This type is used to define the shape of the data.
// You can use a Zod schema here if you want.
export type Confirmation = {
  id: number;
  channel: string;
  agent: string;
  name: string;
  email: string;
  contact: string;
  start_date: Date;
  end_date: Date;
  priority: string;
  status: string;
  pax: number;
  depositAmount: number;
  destinations: string;
  notes: string;
}

// Custom function to format dates
export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};


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
    accessorKey:"agent",
    header:"Agent",
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
    accessorKey: "start_date",
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
    cell: ({ row }) => formatDate(row.original.start_date),
  },
  {
    accessorKey: "end_date",
    header: "End",
    cell: ({ row }) => formatDate(row.original.end_date),
    
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
        High : "bg-[#AB274E] hover:bg-[#cf305e] text-white",
        Medium : "bg-[#E6B467] hover:bg-[#F3C97B] text-black",
        Low : "bg-custom hover:bg-[#06919e] text-white",
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
    header: "Status",
    cell: ({row}) => {
      type Status = "Confirmed" | "Pending" | "Cancelled";

      const status = row.original.status as Status;

      // Define styles for each status
      const statusColors = {
        Cancelled : "text-[#AB274E]",
        Pending : "text-[#E6B467]",
        Confirmed : "text-custom",
      };

      return (
        <span className={`${statusColors[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const confirmation = row.original;
      
      const [isModalOpen, setIsModalOpen] = useState(false);

      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
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
            <DropdownMenuItem onClick={() => setIsModalOpen((prev) => !prev)}>View Confirmation Details</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <BasicModal isOpen={isModalOpen} onClose={() => setIsModalOpen((prev) => !prev)} title={"Confirmation Details"}>
          <ConfirmationDetails confirmation={confirmation}></ConfirmationDetails>
        </BasicModal>
        </>
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
