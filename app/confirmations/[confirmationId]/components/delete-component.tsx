import { Button } from '@/components/ui/button';
import { deleteAccommodation, deleteActionPlan } from '@/lib/api/action-plans';
import { CardType } from '@/types/cards';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';


interface DeleteComponentProps {
    confirmationId: string;
    type: CardType;
    onClose: () => void;
};

export default function DeleteComponent({confirmationId, type, onClose} : DeleteComponentProps) {
    const queryclient = useQueryClient();

    const deleteFnMap: Record<CardType, () => Promise<void>> = {
        "action-plan": () => deleteActionPlan({ confirmationId }),
        "accommodation": () => deleteAccommodation({confirmationId}),
        // add more types as needed
      };
    
    const deleteMutation = useMutation({
        mutationFn: () => {
            const fn = deleteFnMap[type];
            if (!fn) throw new Error("No delete function defined for this card type");
            return fn(); // ✅ Always returns Promise<void>
          },
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['confirmation', confirmationId] }); 
            toast("Deleted succesfully!", {  
                duration: 4000,
                position: "bottom-right",
                style: { backgroundColor: "#006D77", color: "white" },
            });
            onClose();
        },
        onError: (error) => {
            toast( "Something went wrong!", {  
                duration: 4000,
                position: "bottom-right",
                style: { backgroundColor: "#AB274E", color: "white" },
            });
            console.error("Failed to delete confirmation:", error);
        }

    });

    // Conditional text based on the 'type'
    const deleteText = 
    type === 'action-plan'
        ? 'Are you sure you want to delete this Action Plan?'
        : type === 'accommodation'
        ? 'Are you sure you want to delete this Accommodation Plan?'
        : 'Are you sure you want to delete this item?';
    
  return (
    
        <div className="flex flex-col items-start gap-4 px-4">
            <div className="flex flex-row items-center gap-4">
                <Trash2 size="40px" className="text-foreground" /> {/* Bin icon next to "Delete" */}
                <div className="flex flex-col">
                    <span className="text-lg text-foreground">Delete</span> {/* Bold "Delete" text */}
                    <p className="text-foreground/50">{deleteText}</p>
                </div>
            </div>
            

            <div className="flex justify-end gap-2 mt-4 w-full">
                <Button size="lg" variant="outline" className="mr-2 hover:text-foreground" onClick={onClose}>
                    Cancel
                </Button>
                <Button 
                    size="lg" 
                    variant="destructive" 
                    className="bg-[#AB274E] hover:bg-[#cf305e] hover:text-white" 
                    onClick={() => deleteMutation.mutateAsync()}

                >
                    Delete
                </Button>
            </div>
        </div>
    );
  
};
