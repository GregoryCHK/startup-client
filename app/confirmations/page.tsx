import { DataTable } from "@/components/datatable-components/datatable"
import {Confirmation, Columns} from "@/app/confirmations/columns"

export default function Page() {

  const mockData: Confirmation[] = [
    { id: 1, channel: "Online", agent: "Stella", name: "John Doe", email: "john.doe@example.com", contact: "+1234567890", start: new Date("2024-01-01"), end: new Date("2024-01-10"), priority: "High", status: "Confirmed" },
    { id: 2, channel: "Agent", agent: "Gregory", name: "Jane Smith", email: "jane.smith@example.com", contact: "+0987654321", start: new Date("2024-01-15"), end: new Date("2024-02-20"), priority: "Medium", status: "Pending" },
    { id: 3, channel: "Referral", agent: "Gregory", name: "Bob Johnson", email: "bob.johnson@example.com", contact: "+1122334455", start: new Date("2024-01-05"), end: new Date("2024-03-12"), priority: "Medium", status: "Cancelled" },
    { id: 4, channel: "Online", agent: "Stella", name: "Gus Frank", email: "gus12345@example.com", contact: "+1234567890", start: new Date("2024-01-01"), end: new Date("2024-01-10"), priority: "Medium", status: "Confirmed" },
    { id: 5, channel: "Online", agent: "Gregory", name: "Grigoris Champas", email: "grhak2000@gmail.com", contact: "+1234567890", start: new Date("2024-01-01"), end: new Date("2024-01-10"), priority: "High", status: "Confirmed" },
    { id: 6, channel: "Online", agent: "Stella", name: "Katerina Champa", email: "katehk98@example.com", contact: "+1234567890", start: new Date("2024-01-01"), end: new Date("2024-01-10"), priority: "High", status: "Confirmed" },
    { id: 7, channel: "Social Media", agent: "Alex", name: "Chris Evans", email: "chris.evans@example.com", contact: "+1234561234", start: new Date("2024-02-05"), end: new Date("2024-02-15"), priority: "Low", status: "Pending" },
    { id: 8, channel: "Agent", agent: "Sophia", name: "Maria Georgiou", email: "maria.georgiou@example.com", contact: "+9876543210", start: new Date("2024-03-01"), end: new Date("2024-03-15"), priority: "High", status: "Confirmed" },
    { id: 9, channel: "Online", agent: "Dimitris", name: "Nikos Papadopoulos", email: "nikos.p@example.com", contact: "+6543219870", start: new Date("2024-04-10"), end: new Date("2024-04-20"), priority: "Medium", status: "Confirmed" },
    { id: 10, channel: "Referral", agent: "Eleni", name: "George Stathopoulos", email: "george.s@example.com", contact: "+7894561230", start: new Date("2024-05-05"), end: new Date("2024-05-18"), priority: "High", status: "Pending" },
    { id: 11, channel: "Walk-in", agent: "Theo", name: "Diana Marinos", email: "diana.m@example.com", contact: "+3216549870", start: new Date("2024-06-12"), end: new Date("2024-06-25"), priority: "Low", status: "Cancelled" },
    { id: 12, channel: "Corporate", agent: "Gregory", name: "Helen Karamanos", email: "helen.k@example.com", contact: "+9517538462", start: new Date("2024-07-02"), end: new Date("2024-07-15"), priority: "High", status: "Confirmed" },
    { id: 13, channel: "Social Media", agent: "Sophia", name: "Michael Leventis", email: "michael.l@example.com", contact: "+1472583690", start: new Date("2024-08-01"), end: new Date("2024-08-10"), priority: "Medium", status: "Pending" },
    { id: 14, channel: "Online", agent: "Alex", name: "Anna Kosta", email: "anna.k@example.com", contact: "+8529637410", start: new Date("2024-09-05"), end: new Date("2024-09-18"), priority: "Low", status: "Cancelled" },
    { id: 15, channel: "Referral", agent: "Dimitris", name: "Stefanos Nikolaou", email: "stefanos.n@example.com", contact: "+3698521470", start: new Date("2024-10-10"), end: new Date("2024-10-25"), priority: "High", status: "Confirmed" },
    { id: 16, channel: "Corporate", agent: "Eleni", name: "Christina Pavlou", email: "christina.p@example.com", contact: "+1593574862", start: new Date("2024-11-20"), end: new Date("2024-11-30"), priority: "Medium", status: "Confirmed" },
    { id: 17, channel: "Walk-in", agent: "Theo", name: "Alexandros Kanelos", email: "alex.k@example.com", contact: "+7531598420", start: new Date("2024-12-01"), end: new Date("2024-12-12"), priority: "Low", status: "Pending" },
    { id: 18, channel: "Online", agent: "Gregory", name: "Eva Konstantinou", email: "eva.k@example.com", contact: "+8527419630", start: new Date("2025-01-05"), end: new Date("2025-01-15"), priority: "High", status: "Confirmed" },
    { id: 19, channel: "Agent", agent: "Stella", name: "Panagiotis Markos", email: "panagiotis.m@example.com", contact: "+1237896540", start: new Date("2025-02-10"), end: new Date("2025-02-25"), priority: "Medium", status: "Confirmed" },
  ];

  return (
    <section className="mt-2 mx-4">
      {/* <hr className="shadow-sm"/> */}
      <div className="py-3">
        <DataTable columns={Columns} data={mockData} enablePagination={true} enableToolBar={true}></DataTable>
      </div>
    </section>
  )
}
