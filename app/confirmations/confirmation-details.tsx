import React, { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Confirmation } from '@/types/confirmations';
import { formatDate } from '@/lib/utils';
import { updateConfirmation } from '@/lib/api/confirmations';
import DatePicker from '@/components/date-picker';

import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

import { Pen, Pencil } from 'lucide-react';

interface ConfirmationProps{
    confirmation: Confirmation;
};

export default function ConfirmationDetails({confirmation}: ConfirmationProps) {
  // Queryclient to communicate with the page.tsx fetching function and update (used in useMutation function) 
  const queryclient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const { 
    register, 
    handleSubmit, 
    setError, 
    control,
    formState:{ errors, isSubmitting }
  } = useForm({
    defaultValues: confirmation
  });

  // Mutation for updating the confirmation
  const updateMutation = useMutation({
    mutationFn: updateConfirmation,
    onSuccess: (data: Confirmation) => {
      queryclient.invalidateQueries({queryKey: ["confirmations"]}); 
      toast(`${data.name} updated succesfully!`, {  
        duration: 4000,
        position: "bottom-right",
        style: { backgroundColor: "#006D77", color: "white" },
      });
      
    },
    onError: (error: any) => {
      toast( "Something went wrong!", {  
        duration: 4000,
        position: "bottom-right",
        style: { backgroundColor: "#AB274E", color: "white" },
      });
      console.error("Failed to add confirmation:", error);
    }
  });

  // Handle submit
  const onSubmit: SubmitHandler<Confirmation> = async (updatedConfirmation: Confirmation) => {
    // updateMutation.mutateAsync(updatedConfirmation); // Use mutate function to send the update
    try {
      await updateMutation.mutateAsync(updatedConfirmation);  // Trigger the mutation
      setIsEditing((prev) => !prev); // Exit edit mode after successful update
  } catch (error) {
      setError("status", {
          message:"Please check again all the required fields!",
      });
  }
  };

  return (
    <div className="bg-white px-6 pt-6 mx-auto space-y-4">
      {/* Name, Email, Contact */}
      <div className="grid grid-cols-3 gap-4">
        {/* Name Field */}
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Full Name</label>
          <input 
              {...register("name", { 
                  required: "Name is required" 
              })} 
              type="text" 
              placeholder="Name"
              className="input-field"
              readOnly={!isEditing}
          />
          {errors.name && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.name.message}</div>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Email</label>
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
              readOnly={!isEditing}
          />
          {errors.email && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.email.message}</div>}
        </div>

        {/* Contact Field */}
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Contact</label>
          <input 
              {...register("contact")} 
              type="text" 
              placeholder="Phone Number"
              className="input-field"
              readOnly={!isEditing}
          />
        </div>
      </div>

    
      {/* Pax & Deposit */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Pax</label>
          <input
              {...register("pax", {
                  required: "No. of People can't be zero or negative",
                  min: 0, // Prevent negative numbers 
              })} 
              type="number" 
              min="0"
              placeholder="Pax"
              className="input-field" 
              readOnly={!isEditing}
          />
          {errors.pax && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.pax.message}</div>}
        </div>
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Deposit Amount</label>
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
              readOnly={!isEditing}
          />
          {errors.depositAmount && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.depositAmount.message}</div>}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Start Date</label>
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
                  readOnly={!isEditing}
              />
              )}
          />
          {errors.startDate && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.startDate.message}</div>}
        </div>
        <div className="flex flex-col">
            <label className="block px-2 text-sm font-medium text-custom-secondary">End Date</label>
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
                    readOnly={!isEditing}
                />
                )}
            />
            {errors.endDate && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.endDate.message}</div>}
        </div>
      </div>

      {/* Destinations */}
      <div className="flex flex-col">
        <label className="block px-2 text-sm font-medium text-custom-secondary">Destinations</label>
        <textarea 
            {...register("destinations", {
                required: "Specify Destinations",
            })} 
            placeholder="Destinations (e.g. California, New York)"
            className="input-field h-24"
            readOnly={!isEditing}
        />
        {errors.destinations && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.destinations.message}</div>}
      </div>

      <div className="flex flex-col">
        {/* Notes */}
        <label className="block px-2 text-sm font-medium text-custom-secondary">Notes</label>
        <textarea 
            {...register("notes")} 
            placeholder="Notes (optional)"
            className="input-field h-24" 
            readOnly={!isEditing}
        />
      </div>

      {/* Channel & Agent */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Channel</label>
          <input 
              {...register("channel")} 
              type="text" 
              placeholder="Channel" 
              className="input-field" 
              readOnly={!isEditing}
          />
        </div>
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Agent</label>
          <input 
              {...register("agent")} 
              type="text" 
              placeholder="Agent" 
              className="input-field" 
              readOnly={!isEditing}
          />
        </div>
      </div>

      {/* Status & Priority */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col ">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Status</label>
          <select 
              {...register("status", {
                  required: "Select the Status", 
              })} 
              className="input-field"
              disabled={!isEditing}
          >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
          </select>
          {errors.status && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.status.message}</div>}
        </div>
        <div className="flex flex-col">
          <label className="block px-2 text-sm font-medium text-custom-secondary">Priority</label>
          <select 
              {...register("priority", { 
                  required: "Select the Priority", 
              })} 
              className="input-field"
              disabled={!isEditing}
          >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
          </select>
          {errors.priority && <div className="px-2 text-[#AB274E] italic text-sm mt-1">{errors.priority.message}</div>}
        </div>
      </div>

        {/* Edit Button */}
        <div className="col-span-2 flex justify-end pt-4">
          {isEditing ? (
            <>
              <div className="flex justify-center items-center gap-6">
              <Button
                size="lg"
                onClick={handleSubmit(onSubmit)} // Use handleSubmit to trigger form validation and mutation
                className="px-4  flex gap-3 text-center bg-[#AB274E] text-background rounded-lg shadow-md hover:bg-custom-secondary focus-visible:ring-2 focus-visible:ring-custom"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              {/* Cancel Edit Mode */}
              <Button size="lg" className="text-md" variant="outline" onClick={() => setIsEditing((prev) => !prev)} disabled={isSubmitting}>Cancel</Button>
              </div>
            </>
          ) : (
            <Button size="lg" onClick={() => setIsEditing((prev) => !prev) } className="px-4  flex gap-3 text-center bg-custom text-background rounded-lg shadow-md hover:bg-custom-secondary focus-visible:ring-2 focus-visible:ring-custom">
              <Pencil/> Edit
            </Button>
          )}
        </div>
    </div>
  )
};

