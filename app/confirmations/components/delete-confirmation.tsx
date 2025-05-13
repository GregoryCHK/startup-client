import { Button } from "@/components/ui/button";
import { deleteConfirmation } from "@/lib/api/confirmations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";

import { Trash2 } from 'lucide-react'; // Import Trash icon from lucide

interface DeleteConfirmationProps {
    confirmationId: number;
    onClose: () => void;
};

export default function DeleteConfirmation({confirmationId, onClose}: DeleteConfirmationProps) {
    // Queryclient to communicate with the page.tsx fetching function and update (used in useMutation function) 
    const queryclient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteConfirmation,
        onSuccess: () => {
            queryclient.invalidateQueries({queryKey: ["confirmations"]}); 
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

    return (
        <div className="flex flex-col items-start gap-4 px-4">
            <div className="flex flex-row items-center gap-4">
                <Trash2 size="40px" className="text-foreground" /> {/* Bin icon next to "Delete" */}
                <div className="flex flex-col">
                    <span className="text-lg text-foreground">Delete</span> {/* Bold "Delete" text */}
                    <p className="text-foreground/50">Are you sure you want to delete this confirmation?</p>
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
                    onClick={() => deleteMutation.mutateAsync(confirmationId)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};