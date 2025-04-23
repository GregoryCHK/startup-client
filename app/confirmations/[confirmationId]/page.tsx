'use client';

import React, { use } from 'react';
import { House } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchConfirmationById } from '@/lib/api/confirmations';
import { Confirmation } from '@/types/confirmations';
import TabButton from '@/components/tab-button';
import { useParams } from 'next/navigation';

interface PageProps {
  params: Promise<{
    confirmationId: string;
  }>;
};

function Page({ params }: PageProps) {
  const { confirmationId } = use(params);  
  const {
    data: confirmation,
    isLoading,
    error
  } = useQuery<Confirmation>({
    queryKey: ['confirmation', confirmationId],
    queryFn: () => fetchConfirmationById(confirmationId as string),
  });
  if (isLoading) return <div className="flex justify-center mt-10">Loading...</div>;
  if (error) return <div className="flex justify-center mt-10 text-red-500">Error loading confirmation details</div>;

  return (
    <section className='h-[88vh]  my-2 mx-4 p-2 rounded-sm shadow-lg border'>
      <div className="flex items-center space-x-2 pt-1">
        <House className='h-6 text-foreground/50  hover:cursor-pointer hover:text-custom' href={`/confirmations/${confirmationId}`}/>
        {/* Navigation Tabs */}
        {!confirmation?.actionPlan && (
          <TabButton href={`/confirmations/${confirmationId}/action-plan`}>
            Action Plan
          </TabButton>
        )}
        {confirmation?.accomodation && (
        <TabButton href={`/confirmations/${confirmationId}/accommodation`}>
          Accommodation
        </TabButton>
        )}
        {/* Add Button */}
      </div>
    </section>
  )
}

export default Page;
