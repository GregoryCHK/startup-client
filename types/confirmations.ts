// This type is used to define the shape of the data.
// You can use a Zod schema here if you want.

import { StringToBoolean } from 'class-variance-authority/types';
import { CircleCheck, Timer, XCircle, ArrowDown, ArrowUp, ArrowRight, ClockAlert} from 'lucide-react';

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
  actionPlan?: ActionPlan;
  accomodation?: Accomodation;
};

export type ActionPlan = {
  id: string;
  confirmationId: string;
  createdAt: string;
  updatedAt: string;
  entries: ActionPlanEntry[];
};

export type ActionPlanEntry ={
  id: string;
  status: string;
  date: string;
  time: string;
  service: string;
  supplier: string;
  entry_date: string;
  net_rate: number;
  supplier_comments?: string;
  budget_rate?: number;
  price_comments?: string;
};

export type Accomodation = {
  id: string;
  confirmationId: string;
  createdAt: string;
  updatedAt: string;
};

export const priorities = [
  {
    value: "High",
    label: "High",
    icon: ArrowUp,
    color: "bg-[#AB274E] hover:bg-[#cf305e] text-white"
  },
  {
    value: "Medium",
    label: "Medium",
    icon: ArrowRight,
    color: "bg-[#E6B467] hover:bg-[#F3C97B] text-black"
  },
  {
    value: "Low",
    label: "Low",
    icon: ArrowDown,
    color: "bg-custom hover:bg-[#06919e] text-white"
  },
];

export const status = [
  {
    value: "Done",
    label: "Done",
    icon: CircleCheck,
    color: "text-custom" // color for the Done status
  },
  {
    value: "In Progress",
    label: "In Progress",
    icon: Timer,
    color: "text-[#F3C97B]" // color for In Progress (doesnt work)
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    icon: XCircle,
    color: "text-[#AB274E]" // color for Cancelled
  },
  {
    value: "Postponed",
    label: "Postponed",
    icon: ClockAlert,
    color: "text-foreground/50" // color for Postponed
  },
];
