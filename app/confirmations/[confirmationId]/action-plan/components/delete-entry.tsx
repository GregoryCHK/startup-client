import { Button } from "@/components/ui/button";
import { deleteActionPlanEntry } from "@/lib/api/action-plans";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface DeleteActionPlanEntryProps {
  entryId: string;
  onClose: () => void;
}

export default function DeleteActionPlanEntry({ entryId, onClose }: DeleteActionPlanEntryProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteActionPlanEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] }); // adjust if you're using a more specific key
      toast("Deleted successfully!", {
        duration: 4000,
        position: "bottom-right",
        style: { backgroundColor: "#006D77", color: "white" },
      });
      onClose();
    },
    onError: (error) => {
      toast("Something went wrong!", {
        duration: 4000,
        position: "bottom-right",
        style: { backgroundColor: "#AB274E", color: "white" },
      });
      console.error("Failed to delete Action Plan Entry:", error);
    },
  });

  return (
    <div className="flex flex-col items-start gap-4 px-4">
        {/* Text Container */}
        <div className="flex flex-row items-center gap-4">
        <Trash2 size="40px" className="text-foreground" />
        <div className="flex flex-col items-start">
            <span className="text-lg text-foreground">Delete</span>
            <p className="text-foreground/50">
            Are you sure you want to delete this entry?
            </p>
        </div>
        </div>

        {/* Buttons Container */}
        <div className="flex justify-end gap-2 mt-4 w-full">
        {/* Cancel */}
        <Button
            size="lg"
            variant="outline"
            className="mr-2 hover:text-foreground"
            onClick={onClose}
        >
            Cancel
        </Button>
        {/* Delete */}
        <Button
            size="lg"
            variant="destructive"
            className="bg-[#AB274E] hover:bg-[#cf305e] hover:text-white"
            onClick={() => deleteMutation.mutateAsync(entryId)}
        >
            Delete
        </Button>
        </div>
    </div>
  );
}
