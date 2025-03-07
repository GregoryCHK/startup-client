import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { API_ENDPOINTS } from "@/lib/api";
import { Confirmation } from "./columns";

const addConfirmation = async (newConfirmation : Confirmation) => {
    const response = await fetch(API_ENDPOINTS.CONFIRMATIONS,{
        method: "POST",
        headers: {"ContentType": "application/json"},
        body: JSON.stringify(newConfirmation),
    });

    if (!response.ok) {
        throw new Error('Error creating confirmation');
      }

    return response.json();
}

export default function AddConfirmation () {
    const [newConfirmation, setNewConfirmation] = useState<Confirmation>({
        id: 0,
        channel: '',
        agent: '',
        name: '',
        email: '',
        contact: '',
        start: new Date(),
        end: new Date(),
        priority: '',
        status: '',
        pax: 0,
        depositAmount: 0,
        destinations: '',
        notes: '',
    });
    const [errors, setErrors] = useState<any>({});

    // Mutation Function
    const { mutate } = useMutation({mutationFn:addConfirmation});

    // Handle input change for both text, number, and date fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        // Handle date fields (start, end)
        if (name === 'start' || name === 'end') {
        setNewConfirmation({
            ...newConfirmation,
            [name]: new Date(value), // Convert string back to Date
        });
        }
        // Handle number fields (pax, depositAmount)
        else if (name === 'pax' || name === 'depositAmount') {
        setNewConfirmation({
            ...newConfirmation,
            [name]: value ? parseFloat(value) : 0, // Convert string to number
        });
        } else {
        // Handle other text fields
        setNewConfirmation({
            ...newConfirmation,
            [name]: value,
        });
        }
    };

    // Handles submition of the new confirmation 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: any = {};
        Object.keys(newConfirmation).forEach((key) => {
            const typedKey = key as keyof Confirmation; // Type key as one of the keys of Confirmation
            if (typedKey !== 'id' && typedKey !== 'notes' && !newConfirmation[typedKey]) {
              newErrors[typedKey] = `${typedKey} is required`; // Assign error for required fields
            }
        });
      
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      
        // If no errors submit the new confirmation using the mutation function
        mutate(newConfirmation);
    };

    return (
        <form>
            <input
                type="text"
                name="channel"
                placeholder="Channel"
                onChange={handleInputChange}
                value={newConfirmation.channel}
            />
            <input
                type="text"
                name="agent"
                placeholder="Agent"
                value={newConfirmation.agent}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={newConfirmation.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={newConfirmation.email}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="contact"
                placeholder="Phone Number"
                value={newConfirmation.contact}
                onChange={handleInputChange}
            />
            <input
                type="date"
                name="start"
                value={newConfirmation.start.toISOString().split('T')[0]} // Convert Date to string for input
                onChange={handleInputChange}
            />
            <input
                type="date"
                name="end"
                value={newConfirmation.end.toISOString().split('T')[0]} // Convert Date to string for input
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="pax"
                value={newConfirmation.pax}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="depositAmount"
                value={newConfirmation.depositAmount}
                onChange={handleInputChange}
            />
        
        <div>
          <button type="submit"  onSubmit={handleSubmit}>Add Confirmation</button>
        </div>
      </form>
    );
};