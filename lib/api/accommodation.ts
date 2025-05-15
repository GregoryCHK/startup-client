 import { API_ENDPOINTS } from "../api-endpoints";
import { deserializeToCamelCase, serializeToSnakeCase } from "../utils";

interface Params {
    confirmationId: string;
};

 export const addAccommodation = async ({ confirmationId }: Params): Promise<void> => {
   
    const response = await fetch(API_ENDPOINTS.ACCOMMODATION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: confirmationId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create Accommodation Plan');
    };

};

export const deleteAccommodation = async ({ confirmationId }: Params): Promise<void> => {
    const url = `${API_ENDPOINTS.DELETEACCOMMODATION}${confirmationId}/`; // e.g., "/api/action-plans/123/"
  
    const response = await fetch(url, {
      method: 'DELETE',
      
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete Accommodation Plan');
    }
  };