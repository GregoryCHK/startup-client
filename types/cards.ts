export type CardType = 'action-plan' | 'accommodation';

export interface CardData {
  id: string;
  updated_at: string;
  items?: any[]; // Can be activities, rooms, etc.
  count?: number; // Optional explicit count
  title?: string; // Custom title override
}
