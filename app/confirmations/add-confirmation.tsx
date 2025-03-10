import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from 'react-hook-form';

import { API_ENDPOINTS } from "@/lib/api";
import { toSnakeCase } from "@/lib/utils";
import { Confirmation } from "../../types/confirmation";
import { Divide } from "lucide-react";


const addConfirmation = async (newConfirmation: Omit<Confirmation, "id">) => {
    const snakeCaseConfirmation = toSnakeCase(newConfirmation); // Convert the object keys to snake_case for django naming conventions
    // console.log("Sending confirmation:", snakeCaseConfirmation); // Log the transformed object

    const response = await fetch(API_ENDPOINTS.CONFIRMATIONS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snakeCaseConfirmation),  // Send the snake_case object 
    });

    if (!response.ok) {
        throw new Error('Error creating confirmation');
    }

    return response.json();
};

interface AddConfirmationProps{
    onClose: () => void;
};


export default function AddConfirmation ({onClose}: AddConfirmationProps) {
    const { 
        register, 
        handleSubmit, 
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Omit<Confirmation, "id">>();

    // Queryclient to communicate with the page.tsx fetching function and update (used in useMutation function) 
    const queryclient = useQueryClient();

    // Use useMutation hook for the POST request
    const mutation = useMutation({
        mutationFn: addConfirmation,
        onSuccess: () => {
            // console.log("Confirmation added successfully!", newConfirmation);
            queryclient.invalidateQueries({queryKey: ["confirmations"]}); // Rerenders the confirmations using the querykey initializes in pages.tsx
            // reset();
        },
        onError: (error) => {
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
                message: "Something went wrong!"
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
                <input
                    {...register("pax", {
                        required: "No. of People can't be negative",
                        min: 0, // Prevent negative numbers 
                    })} 
                    type="number" 
                    placeholder="Pax"
                    className="input-field" 
                />
                <input 
                    {...register("depositAmount",{
                        required: true,
                        min: 0, // Prevent negative numbers
                    })} 
                    type="number" 
                    placeholder="Deposit Amount"
                    className="input-field"
                />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-custom-secondary">Start Date</label>
                    <input 
                        {...register("startDate", { 
                            required: true 
                        })} 
                        type="date" 
                        className="input-field" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-custom-secondary">End Date</label>
                    <input 
                        {...register("endDate", { 
                            required: true 
                        })} 
                        type="date"
                        className="input-field" 
                    />
                </div>
            </div>

            {/* Destinations */}
            <textarea 
                {...register("destinations", {
                    required: true,
                })} 
                placeholder="Destinations (e.g. California, New York)"
                className="input-field h-24"
            />

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
                <select 
                    {...register("status", {
                        required: true, 
                    })} 
                    className="input-field"
                >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <select 
                    {...register("priority", { 
                        required: true, 
                    })} 
                    className="input-field"
                >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting}
                    className="px-4 py-2 bg-custom text-background rounded-lg shadow-md hover:bg-custom-secondary disabled:bg-gray-400">
                    {isSubmitting ? "Adding..." : "Add Confirmation"}
                </button>
            </div>
        </form>

    );
};