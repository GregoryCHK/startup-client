// This type is used to define the shape of the data.
// You can use a Zod schema here if you want.
export type Confirmation = {
  id: number;
  channel?: string;
  agent?: string;
  name: string;
  email: string;
  contact: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  status: string;
  pax: number;
  depositAmount: number;
  destinations: string;
  notes?: string | null;
};