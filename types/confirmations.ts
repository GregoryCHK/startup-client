// This type is used to define the shape of the data.
// You can use a Zod schema here if you want.

import { CircleCheck, X, Timer, Plus, XCircle, ArrowDown, ArrowUp, ArrowRight} from 'lucide-react';

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
  notes?: string;
};

export const priorities = [
  {
    value: "high",
    label: "High",
    icon: ArrowUp
  },
  {
    value: "medium",
    label: "Medium",
    icon: ArrowRight
  },
  {
    value: "low",
    label: "Low",
    icon: ArrowDown
  },
];

export const status = [
  {
    value: "confirmed",
    label: "Confirmed",
    icon: CircleCheck
  },
  {
    value: "pending",
    label: "Pending",
    icon: Timer
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle
  },
];