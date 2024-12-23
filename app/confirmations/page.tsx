import { DataTable } from "@/components/Confirmations/DataTable"
import {Confirmation, Columns} from "@/components/Confirmations/Columns"

import { useState } from "react";

export default function Page() {

  const mockData: Confirmation[] = [
    {
      id: 1,
      channel: "Online",
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-10"),
      stage: "Confirmed",
    },
    {
      id: 2,
      channel: "Agent",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: "+0987654321",
      start: new Date("2024-01-15"),
      end: new Date("2024-02-20"),
      stage: "Pending",
    },
    {
      id: 3,
      channel: "Referral",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      contact: "+1122334455",
      start: new Date("2024-01-05"),
      end: new Date("2024-03-12"),
      stage: "Cancelled",
    },
    {
      id: 4,
      channel: "Online",
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-10"),
      stage: "Confirmed",
    },
    {
      id: 5,
      channel: "Online",
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-10"),
      stage: "Confirmed",
    },
    {
      id: 6,
      channel: "Online",
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-10"),
      stage: "Confirmed",
    },
    {
      id: 7,
      channel: "Online",
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-10"),
      stage: "Confirmed",
    },
    {
      id: 8,
      channel: "Agent",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: "+0987654321",
      start: new Date("2024-01-15"),
      end: new Date("2024-02-20"),
      stage: "Pending",
    },
    {
      id: 9,
      channel: "Referral",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      contact: "+1122334455",
      start: new Date("2024-01-05"),
      end: new Date("2024-03-12"),
      stage: "Cancelled",
    },
    {
      id: 10,
      channel: "Online",
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-10"),
      stage: "Confirmed",
    },
    {
      id: 11,
      channel: "Online",
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-10"),
      stage: "Confirmed",
    },
    {
      id: 12,
      channel: "Online",
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-10"),
      stage: "Confirmed",
    },
  ];

  return (
    <section className="mt-3 mx-4">
      {/* <hr className="shadow-sm"/> */}
      <div className="py-5">
        <DataTable columns={Columns} data={mockData}></DataTable>
      </div>
    </section>
  )
}
