"use client";

import { useQuery, useMutation } from "@tanstack/react-query";

import { DataTable } from "@/components/datatable-components/datatable";
import {Confirmation, Columns} from "@/app/confirmations/columns";

import { API_ENDPOINTS } from "@/lib/api";

// Used for converting the names of variable (to keep naming conventions consistent)
type ConfirmationApiResponse = {
  id: number;
  channel: string;
  agent: string;
  name: string;
  email: string;
  contact: string;
  start_date: string; // API returns a string
  end_date: string;
  priority: string;
  status: string;
  pax: number;
  deposit_amount: number; // Snake case from API
  destinations: string;
  notes: string;
};

// Fetching Function
async function fetchConfirmations(): Promise<Confirmation[]> {
  const response = await fetch(API_ENDPOINTS.CONFIRMATIONS);
  if (!response.ok) throw new Error("Error fetching data");

  const data: ConfirmationApiResponse[] = await response.json();

  // Directly return the mapped response
  return data.map(({ start_date, end_date, deposit_amount, ...item }) => ({
    ...item,
    start: new Date(start_date),
    end: new Date(end_date),
    depositAmount: deposit_amount,
  }));
}


export default function Page() {
  
  // Query Function
  const { data, isLoading, error } = useQuery({
    queryKey: ["confirmations"],
    queryFn: fetchConfirmations,
    staleTime: 10000,
  });

  if (isLoading) return <p className="flex items-center justify-center mt-10 text-xl text-custom">Loading...</p>;
  if (error) return <p>Error occured: {(error as Error).message}</p>;

  return (
    <section className="mt-2 mx-4">
      {/* <hr className="shadow-sm"/> */}
      <div className="py-3">
        <DataTable columns={Columns} data={data || []} enablePagination={true} enableToolBar={true}></DataTable>
      </div>
    </section>
  )
}

// const mockData = [
  //   { id: 1, channel: "Online", agent: "Stella", name: "John Doe", email: "john.doe@example.com", contact: "+1234567890", start: new Date("2024-01-01"), end: new Date("2024-01-10"), priority: "High", status: "Confirmed", pax: 2, depositAmount: 1000, destinations: "Athens, Santorini", notes: "Honeymoon package" },
  //   { id: 2, channel: "Agent", agent: "Gregory", name: "Jane Smith", email: "jane.smith@example.com", contact: "+0987654321", start: new Date("2024-01-15"), end: new Date("2024-02-20"), priority: "Medium", status: "Pending", pax: 4, depositAmount: 1500, destinations: "Mykonos, Paros", notes: "All-inclusive package" },
  //   { id: 3, channel: "Referral", agent: "Gregory", name: "Bob Johnson", email: "bob.johnson@example.com", contact: "+1122334455", start: new Date("2024-01-05"), end: new Date("2024-03-12"), priority: "Medium", status: "Cancelled", pax: 3, depositAmount: 500, destinations: "Corfu, Rhodes", notes: "Vegetarian meals requested" },
  //   { id: 4, channel: "Online", agent: "Stella", name: "Gus Frank", email: "gus12345@example.com", contact: "+1234567890", start: new Date("2024-01-01"), end: new Date("2024-01-10"), priority: "Medium", status: "Confirmed", pax: 2, depositAmount: 800, destinations: "Athens, Naxos", notes: "Private tour requested" },
  //   { id: 5, channel: "Online", agent: "Gregory", name: "Grigoris Champas", email: "grhak2000@gmail.com", contact: "+1234567890", start: new Date("2024-01-01"), end: new Date("2024-01-10"), priority: "High", status: "Confirmed", pax: 6, depositAmount: 2000, destinations: "Santorini, Mykonos", notes: "Luxury accommodation required" },
  //   { id: 6, channel: "Online", agent: "Stella", name: "Katerina Champa", email: "katehk98@example.com", contact: "+1234567890", start: new Date("2024-01-01"), end: new Date("2024-01-10"), priority: "High", status: "Confirmed", pax: 5, depositAmount: 1800, destinations: "Athens, Thessaloniki", notes: "Wheelchair accessibility needed" },
  //   { id: 7, channel: "Social Media", agent: "Alex", name: "Chris Evans", email: "chris.evans@example.com", contact: "+1234561234", start: new Date("2024-02-05"), end: new Date("2024-02-15"), priority: "Low", status: "Pending", pax: 3, depositAmount: 900, destinations: "Zakynthos, Kefalonia", notes: "Snorkeling tour included" },
  //   { id: 8, channel: "Agent", agent: "Sophia", name: "Maria Georgiou", email: "maria.georgiou@example.com", contact: "+9876543210", start: new Date("2024-03-01"), end: new Date("2024-03-15"), priority: "High", status: "Confirmed", pax: 2, depositAmount: 1200, destinations: "Paros, Milos", notes: "Romantic getaway package" },
  //   { id: 9, channel: "Online", agent: "Dimitris", name: "Nikos Papadopoulos", email: "nikos.p@example.com", contact: "+6543219870", start: new Date("2024-04-10"), end: new Date("2024-04-20"), priority: "Medium", status: "Confirmed", pax: 4, depositAmount: 1600, destinations: "Athens, Crete", notes: "Gluten-free meals requested" },
  //   { id: 10, channel: "Referral", agent: "Eleni", name: "George Stathopoulos", email: "george.s@example.com", contact: "+7894561230", start: new Date("2024-05-05"), end: new Date("2024-05-18"), priority: "High", status: "Pending", pax: 2, depositAmount: 1100, destinations: "Santorini, Naxos", notes: "Sunset cruise included" },
  //   { id: 11, channel: "Walk-in", agent: "Theo", name: "Diana Marinos", email: "diana.m@example.com", contact: "+3216549870", start: new Date("2024-06-12"), end: new Date("2024-06-25"), priority: "Low", status: "Cancelled", pax: 1, depositAmount: 300, destinations: "Athens", notes: "Business trip" },
  //   { id: 12, channel: "Corporate", agent: "Gregory", name: "Helen Karamanos", email: "helen.k@example.com", contact: "+9517538462", start: new Date("2024-07-02"), end: new Date("2024-07-15"), priority: "High", status: "Confirmed", pax: 3, depositAmount: 2000, destinations: "Rhodes, Kos", notes: "Luxury hotel required" },
  //   { id: 13, channel: "Social Media", agent: "Sophia", name: "Michael Leventis", email: "michael.l@example.com", contact: "+1472583690", start: new Date("2024-08-01"), end: new Date("2024-08-10"), priority: "Medium", status: "Pending", pax: 2, depositAmount: 700, destinations: "Milos, Ios", notes: "Photography trip" },
  //   { id: 14, channel: "Online", agent: "Alex", name: "Anna Kosta", email: "anna.k@example.com", contact: "+8529637410", start: new Date("2024-09-05"), end: new Date("2024-09-18"), priority: "Low", status: "Cancelled", pax: 1, depositAmount: 400, destinations: "Thessaloniki", notes: "Family visit" },
  //   { id: 15, channel: "Referral", agent: "Dimitris", name: "Stefanos Nikolaou", email: "stefanos.n@example.com", contact: "+3698521470", start: new Date("2024-10-10"), end: new Date("2024-10-25"), priority: "High", status: "Confirmed", pax: 5, depositAmount: 2500, destinations: "Santorini, Mykonos, Paros", notes: "VIP package" },
  //   { id: 16, channel: "Corporate", agent: "Eleni", name: "Christina Pavlou", email: "christina.p@example.com", contact: "+1593574862", start: new Date("2024-11-20"), end: new Date("2024-11-30"), priority: "Medium", status: "Confirmed", pax: 8, depositAmount: 4000, destinations: "Crete, Rhodes", notes: "Corporate retreat" },
  // ];