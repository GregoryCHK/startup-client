'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { DataTable } from '@/components/datatable-components/datatable';
import { ActionPlanEntry } from '@/types/confirmations'
import { Columns } from './components/columns';
import { useQuery } from '@tanstack/react-query';
import { fetchActionPlanEntries } from '@/lib/api/action-plans';

export default function page() {
  // Get the confirmation Id
  const params = useParams();
  const confirmationId = params.confirmationId as string;
  
  // Query Function
  const { data, isLoading, error } = useQuery<ActionPlanEntry[]>({
    queryKey: ['action-plan-entries', confirmationId],
    queryFn: () => fetchActionPlanEntries(confirmationId),
    enabled: !!confirmationId, // Ensure query runs only when confirmationId is available
  });

  if (isLoading) return <div className="flex items-center justify-center mt-10 text-xl text-custom">Loading...</div>;
  if (error) return <div className="flex items-center justify-center mt-10 text-xl text-custom">Error loading action plan entries.</div>;
  // console.log(data);

  // //Testing Mock Data
  // const initialData: ActionPlanEntry[] = [
  //   {
  //     id: "1",
  //     status: "Confirmed",
  //     date: "2025-05-20",
  //     time: "10:00",
  //     service: "Transfer",
  //     supplier: "Athens Cars",
  //     entryDate: "2025-05-15",
  //     netRate: 50,
  //     supplierComments: "Needs child seat",
  //     budgetRate: 70,
  //     priceComments: "Added margin",
  //   },
  //   {
  //     id: "2",
  //     status: "Pending",
  //     date: "2025-05-21",
  //     time: "09:00",
  //     service: "Tour",
  //     supplier: "City Tours",
  //     entryDate: "2025-05-16",
  //     netRate: 80,
  //     supplierComments: "",
  //     budgetRate: 100,
  //     priceComments: "High season rate",
  //   },
  //   {
  //     id: "2",
  //     status: "Pending",
  //     date: "2025-05-21",
  //     time: "09:00",
  //     service: "Tour",
  //     supplier: "City Tours",
  //     entryDate: "2025-05-16",
  //     netRate: 80,
  //     supplierComments: "",
  //     budgetRate: 100,
  //     priceComments: "High season rate",
  //   },
  //   {
  //     id: "2",
  //     status: "Pending",
  //     date: "2025-05-21",
  //     time: "09:00",
  //     service: "Tour",
  //     supplier: "City Tours",
  //     entryDate: "2025-05-16",
  //     netRate: 80,
  //     supplierComments: "",
  //     budgetRate: 100,
  //     priceComments: "High season rate",
  //   },
  // ];
  
  // const [mockData, setData] = useState<ActionPlanEntry[]>(initialData);
  return (
    <>
    <div className='mt-5 '>
      <DataTable  columns={Columns} data={data|| []} 
                  rowClassName='h-[30px]' 
                  cellClassName='border text-center first:max-w-8 action-plan-cell-widths action-plan-cell-colors' 
                  headerClassName='text-center first:max-w-8 action-plan-cell-widths' 
                  enablePagination={false} 
                  enableScroll={false} 
                  enableToolBar={false}
      />    
    </div>
    </>
  )
};
