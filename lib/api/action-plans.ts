import { ActionPlanEntry } from "@/types/confirmations";
import { API_ENDPOINTS } from "../api-endpoints";
import { deserializeToCamelCase, serializeToSnakeCase } from "../utils";

interface Params {
    confirmationId: string;
};

// Fetch Action Plan Entries
export async function fetchActionPlanEntries(confirmationId: string): Promise<ActionPlanEntry[]> {
  const url = `${API_ENDPOINTS.ACTIONPLANENTRIES}?confirmation=${confirmationId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch action plan entries');
  }

  const data = await response.json();

  return data.map(deserializeToCamelCase);
};

// Delete an ActionPlanEntry
export const deleteActionPlanEntry = async (entryId: string) => {
  const response = await fetch(`${API_ENDPOINTS.ACTIONPLANENTRIES}${entryId}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete Action Plan Entry');
  }
};

// Update an ActionPlanEntry
export const updateActionPlanEntry = async (entryId: number, data: Partial<ActionPlanEntry>) => {
  const snakeCaseEntry = serializeToSnakeCase(data);

  const res = await fetch(`${API_ENDPOINTS.ACTIONPLANENTRIES}${entryId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(snakeCaseEntry),
  });
  if (!res.ok) throw new Error('Failed to update entry');
  return res.json();
};

export const addActionPlan = async ({ confirmationId }: Params): Promise<void> => {
   
    const response = await fetch(API_ENDPOINTS.ACTIONPLANS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: confirmationId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create Action Plan');
    };

};

export const deleteActionPlan = async ({ confirmationId }: Params): Promise<void> => {
    const url = `${API_ENDPOINTS.DELETEACTIONPLAN}${confirmationId}/`; // e.g., "/api/action-plans/123/"
  
    const response = await fetch(url, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete Action Plan');
    }
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
