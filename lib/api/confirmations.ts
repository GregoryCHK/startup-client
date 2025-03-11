import { Confirmation } from "@/types/confirmation";
import { API_ENDPOINTS } from "../api";
import { deserializeToCamelCase, serializeToSnakeCase } from "../utils";

export const addConfirmation = async (newConfirmation: Omit<Confirmation, "id">) => {
    const snakeCaseConfirmation = serializeToSnakeCase(newConfirmation); // Convert the object keys to snake_case for django naming conventions
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

// Fetching Function
export async function fetchConfirmations(): Promise<Confirmation[]> {
  const response = await fetch(API_ENDPOINTS.CONFIRMATIONS);
  if (!response.ok) throw new Error("Error fetching data");

  const data = await response.json();

  return data.map(deserializeToCamelCase);
};
