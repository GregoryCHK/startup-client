import React from "react";
import { useState, useRef, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ActionPlanEntry } from "@/types/confirmations";
import DeleteActionPlanEntry from "./delete-entry";
import { updateActionPlanEntry } from "@/lib/api/action-plans";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";

import DatePicker from "@/components/date-picker";
import TimePicker from "@/components/time-picker";
import EditableTextarea from "@/components/datatable-components/editable-textarea-cell";
import BasicModal from "@/components/basic-modal";


export const Columns: ColumnDef<ActionPlanEntry>[] =[
    {
      id: "actions",
      cell: ({ row }) => {
        const entry = row.original;
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for Deleting Action Plan Entry

        return(
          <>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-6 px-3">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="space-y-1 px-2">
            <DropdownMenuLabel className="text-foreground/70">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDeleteModalOpen((prev) => !prev)}><Trash2 className="text-[#AB274E]"/>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Delete Modal */}
        <BasicModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen((prev) => !prev)} title={""}>
          <div> </div>
          <DeleteActionPlanEntry entryId={entry.id} onClose={() => setIsDeleteModalOpen((prev) => !prev)}/>
        </BasicModal>
        </>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row, column}) => {
        const statusValue = row.getValue<string>(column.id);
        const queryClient = useQueryClient();

        type ActionPlanStatus = "Confirmed" | "Pending" | "Cancelled" | "Issued" | "No Action";

        // State to manage status selection
        const [status, setStatus] = useState<ActionPlanStatus>(statusValue as ActionPlanStatus);


        // Define styles for each Status
        const statusColors = {
          Confirmed: "bg-[#73bfc6] hover:bg-[#06919e] transition-colors",
          Pending: "bg-[#F8E2B1] hover:bg-[#e6ca8e] text-foreground transition-colors",
          Cancelled: "bg-[#cc7a94] hover:bg-[#d74b73] text-white transition-colors",
          Issued: "bg-[#73bfc6] hover:bg-[#06919e] text-white transition-colors",
          'No Action': "bg-[#b5acb5]  hover:bg-[#ac93ac] transition-colors",
        };

        // Update the local status whenever the statusValue changes
        useEffect(() => {
          setStatus(statusValue as ActionPlanStatus);
        }, [statusValue]);

        // Mutation for updating the status 
        const updateEntryMutation = useMutation({
          mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
            updateActionPlanEntry(id, data),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
          
        });

        return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={`w-[90px] text-sm focus-visible:ring-0 ${statusColors[status] || "bg-gray-300 text-black"} transition-none`}>
              {status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="px-2">
            <DropdownMenuLabel className="">Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const newStatus: ActionPlanStatus = "Confirmed";
                updateEntryMutation.mutate({ id: Number(row.original.id), status: newStatus });
              }}
            >
              Confirmed
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const newStatus: ActionPlanStatus = "Issued";
                setStatus(newStatus); 
                updateEntryMutation.mutate({ id: Number(row.original.id), status: newStatus }); // API call
              }}
            >
              Issued
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const newStatus: ActionPlanStatus = "Pending";
                setStatus(newStatus);                
                updateEntryMutation.mutate({ id: Number(row.original.id), status: newStatus }); // API call
              }}
            >
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const newStatus: ActionPlanStatus = "Cancelled";
                setStatus(newStatus);
                updateEntryMutation.mutate({ id: Number(row.original.id), status: newStatus }); // API call
              }}
            >
              Cancelled
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const newStatus: ActionPlanStatus = "No Action";
                setStatus(newStatus);
                updateEntryMutation.mutate({ id: Number(row.original.id), status: newStatus }); // API call
              }}
            >
              No Action
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row, column }) => {
        const value = row.getValue<Date>(column.id);

        const queryClient = useQueryClient();

        const updateEntryMutation = useMutation({
          mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
            updateActionPlanEntry(id, data),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
        });

        return (
          <DatePicker
            value={value}
            onChange={(newDate) => {
              if (newDate && newDate !== value) {
                updateEntryMutation.mutate({ id: Number(row.original.id), date: newDate });
              }
            }}
            placeholder="Select date"
            readOnly={false}
            className="border-none shadow-none bg-transparent justify-center hover:bg-transparent focus:ring-0 py-1 text-sm"
          />
        );
      },
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row, column }) => {
        const rawValue = row.getValue<string>(column.id);
        const value = rawValue?.slice(0, 5); // Ensures it's in "HH:mm" format

        const queryClient = useQueryClient();
    
        const updateEntryMutation = useMutation({
          mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
            updateActionPlanEntry(id, data),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
        });
    
        return (
          <TimePicker
            value={value}
            onChange={(newValue) => {
              if (newValue !== value) {
                updateEntryMutation.mutate({ id: Number(row.original.id), time: newValue })
              }
            }}
            placeholder="Select time"
            readOnly={false}
            className="border-none shadow-none bg-transparent justify-center hover:bg-transparent focus:ring-0 py-1 text-sm"
          />
        );
      },
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row, column }) => {
      const value = row.getValue<string>(column.id);
      return <EditableTextarea value={value} rowId={Number(row.original.id)} field="service" className="table-editable-textarea"/>;
      },
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      cell: ({ row, column }) => {
      const value = row.getValue<string>(column.id);
      return <EditableTextarea value={value} rowId={Number(row.original.id)} field="supplier" className="table-editable-textarea"/>;
      },
    },
    {
      accessorKey: "netRate",
      header: "Net Rate (€)"
    },
    {
      accessorKey: "supplierComments",
      header: "Supplier Comments",
      cell: ({ row, column }) => {
        const value = row.getValue<string>(column.id);
        return <EditableTextarea value={value} rowId={Number(row.original.id)} field="supplierComments" className="table-editable-textarea"/>;
      },
    },
    {
      accessorKey: "budgetRate",
      header: "Budget Rate (€)"
    },
    {
      accessorKey: "priceComments",
      header: "Price Comments",
      cell: ({ row, column }) => {
        const value = row.getValue<string>(column.id);
        return <EditableTextarea value={value} rowId={Number(row.original.id)} field="priceComments" className="table-editable-textarea"/>;
      },
    },
      
];