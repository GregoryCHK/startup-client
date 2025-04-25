'use client';
import { Card } from './card';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchConfirmationById } from '@/lib/api/confirmations';
import Image from 'next/image';

export default function ConfirmationOverview() {
  const params = useParams();
  const confirmationId = params.confirmationId as string;
  const { data: confirmation } = useQuery({
    queryKey: ['confirmation', confirmationId],
    queryFn: () => fetchConfirmationById(confirmationId),
  });

  return (
    <>
    {!confirmation?.actionPlan && !confirmation?.accommodation ? (
      // Empty Overview Layout 
      <div className="flex items-center justify-center h-full">
        <div className=''>
          <Image src="/images/empty-folder.png" alt='Empty' width={200} height={200}/>
          <h3 className='text-center font-semibold text-custom mt-6'>Overview is Empty</h3>
        </div>
      </div>
    ):
      <div className="flex items-center space-x-4 mt-6">
        {/* Action Plan Card */}
        {confirmation?.actionPlan && (
          <Card
            type="action-plan"
            title="Action Plan"
            count={confirmation.actionPlan.actionPlanEntries.length}
            lastUpdated={new Date(confirmation.actionPlan.updatedAt).toLocaleDateString()}
            confirmationId={confirmationId}
            confirmationName={confirmation.name}
          />
        )}

        {/* Accommodation Card - Same pattern */}
        {confirmation?.accommodation && (
          <Card
            type="accommodation"
            title="Accommodation"
            count={confirmation.accommodation.accommodationEntries.length}
            lastUpdated={new Date(confirmation.accommodation.updatedAt).toLocaleDateString()}
            confirmationId={confirmationId}
            confirmationName={confirmation.name}
          />
        )}
      </div>
    }
    </>
  );
}

// 'use client';

// import React, { use } from 'react';
// import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { fetchConfirmationById } from '@/lib/api/confirmations';
// import { Confirmation } from '@/types/confirmations';
// import { TabButton } from './tab-button';
// import { Card } from './card';

// import { House, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { addActionPlan } from '@/lib/api/action-plans';
// import { toast } from 'sonner';

// interface PageProps {
//   params: Promise<{
//     confirmationId: string;
//   }>;
// }


// // ✅ Hook-using component receives plain string
// function ConfirmationPage({ confirmationId }: { confirmationId: string }) {
//   const {
//     data: confirmation,
//     isLoading,
//     error,
//   } = useQuery<Confirmation>({
//     queryKey: ['confirmation', confirmationId],
//     queryFn: () => fetchConfirmationById(confirmationId),
//   });
  
//   const queryClient =  useQueryClient();
  
//   // Mutation to create the Action Plan
//   const { mutate: createActionPlanMutation, isPending } = useMutation({
//     mutationFn: () => addActionPlan({ confirmationId }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['confirmation', confirmationId] });
//       toast('Action Plan created', {
//         duration: 4000,
//         position: 'bottom-right',
//         style: { backgroundColor: '#006D77', color: 'white' },
//       });
//     },
//   });

//   if (isLoading) return <div className="flex items-center justify-center mt-10 text-xl text-custom">Loading...</div>;
//   if (error) return <div className="flex justify-center mt-10 text-red-500">Error loading confirmation details</div>;

//   return (
//     <section className="h-[88vh] my-2 mx-4 py-2 px-4 rounded-sm shadow-lg border">
//       <div className="flex justify-between items-center mt-1">
//         <div className="flex items-center space-x-2">
//           <House className="h-6 text-custom hover:cursor-pointer hover:text-custom-secondary" />
//           {confirmation?.actionPlan && (
//             <TabButton type="action-plan" confirmationId={confirmationId} confirmationName={confirmation.name} active>
//               Action Plan
//             </TabButton>
//           )}
//           {confirmation?.accomodation && (
//             <TabButton type="accommodation" confirmationId={confirmationId} confirmationName={confirmation.name}>
//               Accommodation
//             </TabButton>
//           )}
//         </div>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="rounded-full h-9 w-9">
//               <Plus className="text-custom" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="space-y-1 px-2">
//             <DropdownMenuLabel className="text-foreground/70">Add Component</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//               onClick={() => createActionPlanMutation()}
//               disabled={!!confirmation?.actionPlan || isPending}
//             >
//               {isPending ? 'Creating...' : 'Action Plan'}
//             </DropdownMenuItem>
//             <DropdownMenuItem>Accommodation</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <div className="flex items-center space-x-4 mt-6">
//         {confirmation?.actionPlan && (
//           <Card
//             type="action-plan"
//             title="Action Plan"
//             count={confirmation.actionPlan.actionPlanEntries.length}
//             lastUpdated={new Date(confirmation.actionPlan.updatedAt).toLocaleDateString()}
//             confirmationId={confirmationId}
//             confirmationName={confirmation.name}
//           />
//         )}
//       </div>
//     </section>
//   );
// }

// // ✅ Wrapper: safely resolves async `params` and passes plain props down
// export default function Page({ params }: PageProps) {
//   const { confirmationId } = use(params); // use() is allowed here
//   return <ConfirmationPage confirmationId={confirmationId} />;
// }



