import { useState } from "react";
import { ActionPlanEntry } from "@/types/confirmations";
import BasicModal from "@/components/basic-modal";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import DeleteActionPlanEntry from "./components/delete-entry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateActionPlanEntry } from "@/lib/api/action-plans";
import { Input } from "@/components/ui/input";



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
    },
    {
        accessorKey: "time",
        header: "Time",
    },
    {
        accessorKey: "service",
        header: "Service",
        cell: ({ row, column }) => {
          const value = row.getValue<string>(column.id);
          const queryClient = useQueryClient();

          const updateEntryMutation = useMutation({
            mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
              updateActionPlanEntry(id, data),
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
          });

          return (
            <input
              className="w-full h-full bg-transparent text-center focus:outline-none focus:italic focus:bg-white"
              autoFocus
              defaultValue={value}
              onBlur={(e) => {
                const newValue = e.target.value;
                if (newValue !== value) {
                  // Call your update mutation here:
                  updateEntryMutation.mutate({ id: Number(row.original.id), service: newValue });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  (e.target as HTMLInputElement).blur();
                }
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
      header: "Net Rate (€)",
    },
    {
      accessorKey: "supplierComments",
      header: "Supplier Comments",
      cell: ({ row, column }) => {
        const value = row.getValue<string>(column.id);
        const queryClient = useQueryClient();

        const updateEntryMutation = useMutation({
          mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
            updateActionPlanEntry(id, data),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
        });

        return (
          <input
            className="w-full h-full bg-transparent text-center focus:outline-none focus:italic focus:bg-white"
            autoFocus
            defaultValue={value}
            onBlur={(e) => {
              const newValue = e.target.value;
              if (newValue !== value) {
                // Call your update mutation here:
                updateEntryMutation.mutate({ id: Number(row.original.id), supplierComments: newValue });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                (e.target as HTMLInputElement).blur();
              }
            }}
          />
        );
      },
    },
    {
      accessorKey: "budgetRate",
      header: "Budget Rate (€)",
    },
    {
      accessorKey: "priceComments",
      header: "Price Comments",
      cell: ({ row, column }) => {
        const value = row.getValue<string>(column.id);
        const queryClient = useQueryClient();

        const updateEntryMutation = useMutation({
          mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
            updateActionPlanEntry(id, data),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }),
        });

        return (
          // <textarea
          //   className="w-full h-full bg-transparent text-center focus:outline-none focus:italic focus:bg-white overflow-y-auto break-words whitespace-pre-wrap resize-none"
          //   defaultValue={value}
          //   rows={1}
          //   onBlur={(e) => {
          //     const newValue = e.target.value;
          //     if (newValue !== value) {
          //       // Call your update mutation here:
          //       updateEntryMutation.mutate({ id: Number(row.original.id), priceComments: newValue });
          //     }
          //   }}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter') {
            //     (e.target as HTMLInputElement).blur();
            //   }
            // }}
          // />
          <div
            contentEditable
            className="w-full h-full text-center bg-red-600 flex items-center justify-center focus:outline-none break-words whitespace-pre-wrap"
            onBlur={(e) => {
              const newValue = e.currentTarget.textContent || "";
              if (newValue !== value) {
                updateEntryMutation.mutate({ id: Number(row.original.id), priceComments: newValue });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                (e.target as HTMLInputElement).blur();
              }
            }}
            suppressContentEditableWarning
          >
            {value}
          </div>
        );
      },
    },
      
];