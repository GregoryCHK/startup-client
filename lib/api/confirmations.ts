import { Confirmation } from "@/types/confirmations";
import { API_ENDPOINTS } from "../api-endpoints";
import { deserializeToCamelCase, serializeToSnakeCase } from "../utils";

// Posting New Confirmation Function
export const addConfirmation = async (newConfirmation: Omit<Confirmation, "id">) => {
    const snakeCaseConfirmation = serializeToSnakeCase(newConfirmation); // Convert the object keys to snake_case for django naming conventions

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

// Update existing Confirmation function
export const updateConfirmation = async (confirmation: Confirmation): Promise<Confirmation> => {
    const snakeCaseConfirmation = serializeToSnakeCase(confirmation); // Convert the object keys to snake_case for django naming conventions

    const response = await fetch(`${API_ENDPOINTS.CONFIRMATIONS}${confirmation.id}/`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(snakeCaseConfirmation),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update confirmation');
    }

    return response.json();
  };

// Fetching Confirmations Function
export const fetchConfirmations = async (): Promise<Confirmation[]> => {
  const response = await fetch(API_ENDPOINTS.CONFIRMATIONS);

  if (!response.ok) throw new Error("Error fetching data");

  const data = await response.json();

  return data.map(deserializeToCamelCase);
};

// Deleting Confirmation Function
export const deleteConfirmation = async (confirmationId: number) => {
    const response = await fetch(`${API_ENDPOINTS.CONFIRMATIONS}${confirmationId}/`, {
        method: "DELETE",
    });
    
    if (!response.ok) {
        throw new Error("Failed to delete confirmation!");
    };
    // If function works right it should return status 204 OK
    if (response.status === 204) {
        return ;
    };

    // Otherwise, handle responses with content (if any)
    return response.json();
};

