import { DataTable } from "@/components/DataTable"
import {Confirmation, columns} from "./columns"
import { mock } from "node:test";

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
      start: new Date("2024-02-15"),
      end: new Date("2024-02-20"),
      stage: "Pending",
    },
    {
      id: 3,
      channel: "Referral",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      contact: "+1122334455",
      start: new Date("2024-03-05"),
      end: new Date("2024-03-12"),
      stage: "Cancelled",
    },
  ];

  return (
    <section className="mt-2 px-4">
      <div className="mx-auto rounded-lg shadow ">
        <DataTable columns={columns} data={mockData}></DataTable>
      </div>
    </section>
  )
}
