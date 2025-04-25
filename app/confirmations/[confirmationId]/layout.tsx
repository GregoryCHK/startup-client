// app/confirmations/[confirmationId]/layout.tsx
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchConfirmationById } from '@/lib/api/confirmations';
import { Confirmation } from '@/types/confirmations';
import { TabButton } from './tab-button'; 
import { House, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { addActionPlan, addAccommodation } from '@/lib/api/action-plans';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function ConfirmationLayout({ children }: {children:React.ReactNode}) {
    const params = useParams();
    const confirmationId = params.confirmationId as string;
    const {
        data: confirmation,
        isLoading,
        error,
    } = useQuery<Confirmation>({
        queryKey: ['confirmation', confirmationId],
        queryFn: () => fetchConfirmationById(confirmationId),
    });

    const confirmationName = confirmation?.name;
    const queryClient =  useQueryClient();
  
    // Mutation to create the Action Plan
    const { mutate: createActionPlanMutation, isPending } = useMutation({
        mutationFn: () => addActionPlan({ confirmationId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['confirmation', confirmationId] });
            toast('Action Plan created', {
            duration: 4000,
            position: 'bottom-right',
            style: { backgroundColor: '#006D77', color: 'white' },
            });
        },
    });

    // Mutation to create the Action Plan
    const { mutate: createAccommodationMutation } = useMutation({
        mutationFn: () => addAccommodation({ confirmationId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['confirmation', confirmationId] });
            toast('Accommodation created', {
            duration: 4000,
            position: 'bottom-right',
            style: { backgroundColor: '#006D77', color: 'white' },
            });
        },
    });
    console.log(confirmation?.accommodation);

    if (isLoading) return <div className="flex items-center justify-center mt-10 text-xl text-custom">Loading...</div>;
    if (error) return <div className="flex justify-center mt-10 text-red-500">Error Loading Confirmation Overview</div>;

    return (
        <section className="h-[88vh] my-2 mx-4 py-2 px-4 rounded-sm shadow-lg border">
            <div className="flex justify-between items-center mt-1">
                <div className="flex items-center space-x-2">
                    <Link href={{
                            pathname: `/confirmations/${confirmationId}/`,
                            query: { confirmationName },
                            }}>  
                        <House 
                            className="h-8 text-custom shadow-sm hover:cursor-pointer hover:text-custom-secondary transition-colors" 
                    />
                    </Link>
                    {confirmation?.actionPlan && (
                    <TabButton
                        type="action-plan"
                        confirmationId={confirmationId}
                        confirmationName={confirmation.name}
                    >
                        Action Plan
                    </TabButton>
                    )}
                    {confirmation?.accommodation && (
                    <TabButton
                        type="accommodation"
                        confirmationId={confirmationId}
                        confirmationName={confirmation.name}
                    >
                        Accommodation
                    </TabButton>
                    )}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full h-9 w-9">
                            <Plus className="text-custom" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="space-y-1 px-2">
                        <DropdownMenuLabel className="text-foreground/70">Add Component</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => createActionPlanMutation()}
                            disabled={!!confirmation?.actionPlan || isPending}
                            className="aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:italic aria-disabled:text-custom"
                        >
                            {isPending ? 'Creating...' : confirmation?.actionPlan ? 'Action Plan exists' : 'Action Plan'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => createAccommodationMutation()}
                            disabled={!!confirmation?.accommodation || isPending}
                            className="aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:italic aria-disabled:text-custom"
                        >
                            {confirmation?.accommodation ? 'Accommodation Plan exists' : 'Accommodation'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="h-[80vh]">{children}</div>
        </section>
    );
}
