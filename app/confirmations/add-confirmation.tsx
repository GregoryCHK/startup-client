import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import { API_ENDPOINTS } from "@/lib/api";
import { addConfirmation } from "@/lib/api/confirmations";
import { serializeToSnakeCase, cn } from "@/lib/utils";
import { Confirmation } from "../../types/confirmation";

import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddConfirmationProps{
    onClose: () => void;
};


export default function AddConfirmation ({onClose}: AddConfirmationProps) {
    const { 
        register, 
        handleSubmit, 
        control,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Omit<Confirmation, "id">>();

    // Queryclient to communicate with the page.tsx fetching function and update (used in useMutation function) 
    const queryclient = useQueryClient();

    // Use useMutation hook for the POST request
    const mutation = useMutation({
        mutationFn: addConfirmation,
        onSuccess: (data) => {
            queryclient.invalidateQueries({queryKey: ["confirmations"]}); // Rerenders the confirmations using the querykey initializes in pages.tsx
            reset();
            toast(`${data.name} added succesfully!`, {  
                duration: 4000,
                position: "bottom-right",
                style: { backgroundColor: "#006D77", color: "white" },
            });
        },
        onError: (error) => {
            toast( "Something went wrong!", {  
                duration: 4000,
                position: "bottom-right",
                style: { backgroundColor: "#AB274E", color: "white" },
            });
            console.error("Failed to add confirmation:", error);
        }
    });

    const onSubmit: SubmitHandler<Omit<Confirmation, "id">> = async (data) => {
        try {
            await mutation.mutateAsync(data);  // Trigger the mutation
            onClose();
        } catch (error) {
            // console.error("Error during submission:", error);
            setError("status", {
                message:"Please check again all the required fields!",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6  mx-auto space-y-4">
            {/* Name, Email, Contact */}
            <div className="grid grid-cols-3 gap-4">
                {/* Name Field */}
                <div className="flex flex-col">
                    <input 
                        {...register("name", { 
                            required: "Name is required" 
                        })} 
                        type="text" 
                        placeholder="Name"
                        className="input-field"
                    />
                    {errors.name && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.name.message}</div>}
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                    <input 
                        {...register("email", { 
                            required: "Email is required",
                            validate: (value) => {
                                if (!value.includes("@")) {
                                    return "Email must include @";
                                } 
                                return true;
                            },    
                        })} 
                        type="email" 
                        placeholder="Email"
                        className="input-field"
                    />
                    {errors.email && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.email.message}</div>}
                </div>

                {/* Contact Field */}
                <div className="flex flex-col">
                    <input 
                        {...register("contact")} 
                        type="text" 
                        placeholder="Phone Number"
                        className="input-field"
                    />
                </div>
            </div>

            
            {/* Pax & Deposit */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <input
                        {...register("pax", {
                            required: "No. of People can't be zero or negative",
                            min: 0, // Prevent negative numbers 
                        })} 
                        type="number" 
                        min="0"
                        placeholder="Pax"
                        className="input-field" 
                    />
                    {errors.pax && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.pax.message}</div>}
                </div>
                <div className="flex flex-col">
                    <input 
                        {...register("depositAmount",{
                            required: "Deposit Amount is required",
                            min: 0, // Prevent negative numbers
                        })} 
                        type="number" 
                        min="0"
                        step="0.01"
                        placeholder="Deposit Amount"
                        className="input-field"
                    />
                    {errors.depositAmount && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.depositAmount.message}</div>}
                </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-custom-secondary">Start Date</label>
                    {/* <input 
                        {...register("startDate", { 
                            required: true 
                        })} 
                        type="date" 
                        className="input-field" 
                    /> */}
                    <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: "Start Date is required" }}
                        render={({ field }) => (
                        <DatePicker 
                            value={field.value} 
                            onChange={field.onChange} 
                            placeholder="Start Date" 
                        />
                        )}
                    />
                    {errors.startDate && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.startDate.message}</div>}
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-custom-secondary">End Date</label>
                    {/* <input 
                        {...register("endDate", { 
                            required: true 
                        })} 
                        type="date"
                        className="input-field" 
                    /> */}
                    <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: "End Date is required" }}
                        render={({ field }) => (
                        <DatePicker 
                            value={field.value} 
                            onChange={field.onChange} 
                            placeholder="End Date" 
                        />
                        )}
                    />
                    {errors.endDate && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.endDate.message}</div>}
                </div>
            </div>

            {/* Destinations */}
            <div className="flex flex-col">
                <textarea 
                    {...register("destinations", {
                        required: "Specify Destinations",
                    })} 
                    placeholder="Destinations (e.g. California, New York)"
                    className="input-field h-24"
                />
                {errors.destinations && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.destinations.message}</div>}
            </div>
            {/* Notes */}
            <textarea 
                {...register("notes")} 
                placeholder="Notes (optional)"
                className="input-field h-24" 
            />

            {/* Channel & Agent */}
            <div className="grid grid-cols-2 gap-4">
                <input 
                    {...register("channel")} 
                    type="text" 
                    placeholder="Channel" 
                    className="input-field" 
                />
                <input 
                    {...register("agent")} 
                    type="text" 
                    placeholder="Agent" 
                    className="input-field" 
                />
            </div>

            {/* Status & Priority */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col ">
                    <select 
                        {...register("status", {
                            required: "Select the Status", 
                        })} 
                        className="input-field"
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    {errors.status && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.status.message}</div>}
                </div>
                <div className="flex flex-col">
                    <select 
                        {...register("priority", { 
                            required: "Select the Priority", 
                        })} 
                        className="input-field"
                    >
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    {errors.priority && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.priority.message}</div>}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button size="lg" type="submit" disabled={isSubmitting}
                    className="px-4 bg-custom text-background rounded-lg shadow-md hover:bg-custom-secondary focus-visible:ring-2 focus-visible:ring-custom disabled:bg-gray-400">
                    {mutation.isPending ? <div className="w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div> : (isSubmitting ? "Adding..." : "Add Confirmation")}
                </Button>
            </div>
        </form>

    );
};