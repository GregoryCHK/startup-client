"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Confirmation = {
  id: number
  channel: string
  name: string
  email: string
  contact: string
  start: Date
  end: Date
  stage: string
}


function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}


export const columns: ColumnDef<Confirmation>[] = [
  {
    accessorKey: "channel",
    header: "Channel",
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
    header: "Start",
    cell: ({ row }) => formatDate(new Date(row.original.start)),
  },
  {
    accessorKey: "end",
    header: "End",
    cell: ({ row }) => formatDate(new Date(row.original.end)),
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
]
