import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert camelCase → snake_case (for sending data to the backend)
export const toSnakeCase = (obj: any) => {
  return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
          key.replace(/([A-Z])/g, "_$1").toLowerCase(), 
          value
      ])
  );
};

// Convert snake_case → camelCase (for receiving data from the backend)
export const toCamelCase = (obj: any) => {
  return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
          key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()), 
          value
      ])
  );
};