'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Columns } from './components/columns';
import { DataTable } from '@/components/datatable-components/datatable';
import { ActionPlanEntry } from '@/types/confirmations'
import { createActionPlanEntry, fetchActionPlan, fetchActionPlanEntries } from '@/lib/api/action-plans';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function page() {
  // Get the confirmation Id
  const params = useParams();
  const confirmationId = params.confirmationId as string;
  const queryClient = useQueryClient();

  // Query Function
  const { data, isLoading, error } = useQuery<ActionPlanEntry[]>({
    queryKey: ['action-plan-entries', confirmationId],
    queryFn: () => fetchActionPlanEntries(confirmationId),
    enabled: !!confirmationId, // Ensure query runs only when confirmationId is available
  });

  // FallBack Function if Action Plan is empty
  const {
    data: fallbackActionPlan,
    isLoading: isFallbackLoading,
  } = useQuery({
    queryKey: ['fallback-action-plan', confirmationId],
    queryFn: () => fetchActionPlan(confirmationId),
    enabled: !!confirmationId && data?.length === 0,
  });
  console.log(fallbackActionPlan);
  // Extract actionPlanId from existing data if available
  // const actionPlan = data && data.length > 0 ? data[0].actionPlan : undefined;
  const actionPlan = data?.[0]?.actionPlan ?? fallbackActionPlan?.[0]?.id;

  console.log(actionPlan);
  
  const {mutate: createEntry} = useMutation({
    mutationFn: async (newEntry: any) => {
      if (!actionPlan) throw new Error('No actionPlanId available');
      return createActionPlanEntry(Number(actionPlan), newEntry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['action-plan-entries'],
      });
    },
  });

  if (isLoading) return <div className="flex items-center justify-center mt-10 text-xl text-custom">Loading...</div>;
  if (isFallbackLoading) return <div className="flex items-center justify-center mt-10 text-xl text-custom">Loading...</div>;
  if (error) return <div className="flex items-center justify-center mt-10 text-xl text-custom">Error loading action plan entries.</div>;
  
  const handleAddEntry = () => {
    const newEntry = {
                      status: 'No Action',
                      date: new Date().toISOString().split('T')[0],
                      time: '00:00',
                      service: '',
                      supplier: '',
                      netRate: 0,
                      budgetRate: 0,
                      supplierComments: '',
                      priceComments: '',
                    };
      createEntry(newEntry);
  };

  return (
    <>
    <div className='mt-5 '>
      <DataTable  columns={Columns} data={data|| []} 
                  rowClassName='min-h-[30px]' 
                  cellClassName='border text-center action-plan-cell-widths action-plan-cell-colors' 
                  headerClassName='text-center action-plan-cell-widths' 
                  enablePagination={false} 
                  enableScroll={false} 
                  enableToolBar={false}
      />    
      {/* Add button */}
      <div className="mt-2 flex justify-center">
        <Button
          onClick={handleAddEntry}
          disabled={isLoading}
          variant='outline'
          size='lg'
          className=""
        >
          {/* {createEntryMutation.isLoading ? 'Adding...' : 'Add Action Plan Entry'} */}
          <Plus className='text-custom'/>
        </Button>
      </div>
    </div>
    </>
  )
};
