"use client"

import { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronsUpDown, CircleArrowRight, Trash2, FilePenLine, RotateCwSquare } from "lucide-react";

import BasicModal from "@/components/basic-modal";
import ConfirmationDetails from "./confirmation-details";
import { Confirmation, priorities, status } from "../../types/confirmations";
import { formatDate } from "@/lib/utils";

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
import DeleteConfirmation from "./delete-confirmation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConfirmation } from "@/lib/api/confirmations";
import { toast } from "sonner";


export const Columns: ColumnDef<Confirmation>[] = [
  {
    accessorKey: "channel",
    header: ({ column }) => {
      return (
        <Button
          id="channel_button"
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
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          id="startDate_button"
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start
          <ChevronsUpDown className="ml-[1px] h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => formatDate(row.original.startDate),
  },
  {
    accessorKey: "endDate",
    header: "End",
    cell: ({ row }) => formatDate(row.original.endDate),
    
  },
  { 
    accessorKey:"priority",
    header:({ column }) => {
      return (
        <Button
          id="priority_button"
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ChevronsUpDown className="ml-[1px] h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      type Priority = "High" | "Medium" | "Low";

      const confirmation = row.original;

      // Queryclient to communicate with the page.tsx fetching function and update (used in useMutation function) 
      const queryClient = useQueryClient();

      // State to manage priority selection
      const [priority, setPriority] = useState<Priority>(confirmation.priority as Priority);
  
      // Define styles for each priority level
      const priorityColors = {
        High : "bg-[#AB274E] hover:bg-[#cf305e] text-white",
        Medium : "bg-[#E6B467] hover:bg-[#F3C97B] text-black",
        Low : "bg-custom hover:bg-[#06919e] text-white",
      };

      // Update the local 'priority' state whenever the 'confirmation.priority' value changes.
      // This ensures the component state stays in sync with the latest 'confirmation' data.
      useEffect(() => {
        setPriority(confirmation.priority as Priority);
      }, [confirmation.priority]);
      
      // useMutation for updating priority
      const mutation = useMutation({
        mutationFn: (newPriority: Priority) => updateConfirmation({ ...confirmation, priority: newPriority }),
        
        // The `onMutate` function runs before the mutation is sent to the server
        onMutate: async (newPriority) => {
          await queryClient.cancelQueries({ queryKey: ["confirmations"] }); // Cancel any ongoing 'confirmations' queries
      
          // Snapshot the previous data to allow rollback in case of failure
          const previousData = queryClient.getQueryData<Confirmation[]>(["confirmations"]);
      
          // Optimistically update the UI by modifying the priority of the confirmation in the cache
          queryClient.setQueryData(["confirmations"], (oldData: Confirmation[] | undefined) => {
            return oldData?.map((item) =>
              item.id === confirmation.id ? { ...item, priority: newPriority } : item
            ) || []; // Update the confirmation priority if it matches the id
          });
      
          return { previousData }; // Return the previous data to roll back if the mutation fails
        },

        onError: (err, newPriority, context) => {
          console.error("Failed to update priority:", err);
          queryClient.setQueryData(["confirmations"], context?.previousData); // Rollback on error
          toast( "Something went wrong!", {  
              duration: 4000,
              position: "bottom-right",
              style: { backgroundColor: "#AB274E", color: "white" },
          });
        },

        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ["confirmations"]}); // Refetch data
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={`w-20 focus-visible:ring-0 ${priorityColors[priority] || "bg-gray-300 text-black"} transition-none`}>
              {priority}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className="">Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setPriority("High"); // Immediate UI update
                mutation.mutate("High"); // API call
              }}
            >
              High
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPriority("Medium");
                mutation.mutate("Medium");
              }}
            >
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPriority("Low");
                mutation.mutate("Low");
              }}
            >
              Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )  
    }
  },
  {
    accessorKey:"status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.original.status as string; // Get the status value (it's a string)
    
      // Find the status configuration that matches the value
      const statusConfig = status.find((s) => s.value === statusValue);

      if (!statusConfig) {
        // If no matching statusConfig is found, return a default or null value
        return <span>Unknown Status</span>; // You can return something else here if you prefer
      }

      return (
        <span className={`flex items-center gap-2 ${statusConfig.color}`}>
          <statusConfig.icon className={`w-4 h-4 ${statusConfig.color}`} />
          {statusConfig.label}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const confirmation = row.original;
      
      const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for View Confirmation Details
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for Deleting a Confirmation

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
            <DropdownMenuItem onClick={() => setIsDetailsModalOpen((prev) => !prev)}><FilePenLine/>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteModalOpen((prev) => !prev)}><Trash2 />Delete</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View/Edit Modal */}
        <BasicModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen((prev) => !prev)} title={"Confirmation Details"}>
          <ConfirmationDetails confirmation={confirmation}></ConfirmationDetails>
        </BasicModal>

        {/* Delete Modal */}
        <BasicModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen((prev) => !prev)} title={""}>
          <DeleteConfirmation confirmationId={confirmation.id} onClose={() => setIsDeleteModalOpen((prev) => !prev)}></DeleteConfirmation>
        </BasicModal>
        </>
      )
    },
  },
  {
    id: "info",
    header: "",
    cell: ({row}) => {
      const confirmationId = row.original.id;
      const confirmationName = row.original.name; // Passed in the breadcrumb

      return(
        <Link className="flex justify-center p-2" href={`/confirmations/${confirmationId}?confirmationName=${encodeURIComponent(confirmationName)}`}>
          <CircleArrowRight className="h-5 w-5" strokeWidth={1.5}/>
        </Link>
      )
    },
  },
]
