import React from "react";
import { useState, useRef, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ActionPlanEntry } from "@/types/confirmations";
import BasicModal from "@/components/basic-modal";
import DeleteActionPlanEntry from "./delete-entry";
import { updateActionPlanEntry } from "@/lib/api/action-plans";
import { formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import DatePicker from "@/components/date-picker";
import TimePicker from "@/components/time-picker";
import { format, isValid } from "date-fns";



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
            />
          );
        }
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
            />
          );
        },
    },
    {
        accessorKey: "service",
        header: "Service",
        cell: ({ row, column }) => {
          const value = row.getValue<string>(column.id);
          const queryClient = useQueryClient();
  
          // Mutation Function to update the cell input
          const updateEntryMutation = useMutation({
            mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
              updateActionPlanEntry(id, data),
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
          });
  
          // Ref to directly access the textarea DOM element
          const textareaRef = useRef<HTMLTextAreaElement>(null)
  
          // Auto-adjust height on mount based on initial content
          useEffect(() => {
            const textarea = textareaRef.current
            if (textarea) {
              textarea.style.height = "auto" // Reset height
              textarea.style.height = textarea.scrollHeight + "px" // Set to scroll height
            }
          }, [value])
  
          return (
            <textarea
              ref={textareaRef}
              className="table-editable-textarea"
              defaultValue={value}
              rows={1}
              onBlur={(e) => {
                const newValue = e.target.value;
                if (newValue !== value) {
                  updateEntryMutation.mutate({ id: Number(row.original.id), service: newValue });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              onInput={(e) => {
                // Dynamically adjust the height as user types
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto" // Reset height to shrink if needed
                target.style.height = target.scrollHeight + "px" // Expand to fit content
              }}
            />
          );
        },
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
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
        const queryClient = useQueryClient();

        // Mutation Function to update the cell input
        const updateEntryMutation = useMutation({
          mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
            updateActionPlanEntry(id, data),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
        });

        // Ref to directly access the textarea DOM element
        const textareaRef = useRef<HTMLTextAreaElement>(null)

        // Auto-adjust height on mount based on initial content
        useEffect(() => {
          const textarea = textareaRef.current
          if (textarea) {
            textarea.style.height = "auto" // Reset height
            textarea.style.height = textarea.scrollHeight + "px" // Set to scroll height
          }
        }, [value])

        return (
          <textarea
            ref={textareaRef}
            className="table-editable-textarea"
            defaultValue={value}
            rows={1}
            onBlur={(e) => {
              const newValue = e.target.value;
              if (newValue !== value) {
                updateEntryMutation.mutate({ id: Number(row.original.id), supplierComments: newValue });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                (e.target as HTMLInputElement).blur();
              }
            }}
            onInput={(e) => {
              // Dynamically adjust the height as user types
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto" // Reset height to shrink if needed
              target.style.height = target.scrollHeight + "px" // Expand to fit content
            }}
          />
        );
      },
    },
    {
      accessorKey: "budgetRate",
      header: "Budget Rate (€)"
      // header: () => (
      //   <div className="text-[#7c3cfe]">
      //     Budget Rate (€)
      //   </div>
      // ),
      // cell: ({ row, column }) => {
      //   const value = row.getValue<string>(column.id);

      //   return(
          // <span className="text-[#7d3cfe8e] font-semibold">{value}</span>
      //   );
      // },
    },
    {
      accessorKey: "priceComments",
      header: "Price Comments",
      cell: ({ row, column }) => {
        const value = row.getValue<string>(column.id);
        const queryClient = useQueryClient();

        // Mutation Function to update the cell input
        const updateEntryMutation = useMutation({
          mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
            updateActionPlanEntry(id, data),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
        });

        // Ref to directly access the textarea DOM element
        const textareaRef = useRef<HTMLTextAreaElement>(null)

        // Auto-adjust height on mount based on initial content
        useEffect(() => {
          const textarea = textareaRef.current
          if (textarea) {
            textarea.style.height = "auto" // Reset height
            textarea.style.height = textarea.scrollHeight + "px" // Set to scroll height
          }
        }, [value])

        return (
          <textarea
            ref={textareaRef}
            className="table-editable-textarea"
            defaultValue={value}
            rows={1}
            onBlur={(e) => {
              const newValue = e.target.value;
              if (newValue !== value) {
                updateEntryMutation.mutate({ id: Number(row.original.id), priceComments: newValue });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                (e.target as HTMLInputElement).blur();
              }
            }}
            onInput={(e) => {
              // Dynamically adjust the height as user types
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto" // Reset height to shrink if needed
              target.style.height = target.scrollHeight + "px" // Expand to fit content
            }}
          />
        );
      },
    },
      
];