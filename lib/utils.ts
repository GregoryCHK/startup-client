import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert camelCase → snake_case and formats Date Object to String (for sending data to the backend)
export const serializeToSnakeCase = (obj: any) => {
  return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
          key.replace(/([A-Z])/g, "_$1").toLowerCase(), 
          value instanceof Date ? format(value, "yyyy-MM-dd") : value, // Format dates
      ])
  );
};

// // Convert snake_case → camelCase and formats String Object to Date (for receiving data from the backend)
// export const deserializeToCamelCase = (obj: any) => {
//   return Object.fromEntries(
//       Object.entries(obj).map(([key, value]) => [
//           key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()), 
//           typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) // Check if it's a valid date string (yyyy-MM-dd)
//           ? parse(value, "yyyy-MM-dd", new Date()) // Convert back to Date object
//           : value,
//       ])
//   );
// };

export const deserializeToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(deserializeToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        deserializeToCamelCase(value),
      ])
    );
  }
  return obj;
};


// Format Date to DD/MM/YY
export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};