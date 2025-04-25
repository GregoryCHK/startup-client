import Link from 'next/link';
import React from 'react'

type TabType = "action-plan" | "accommodation"; // Add more types later

interface TabButtonProps {
  type: TabType;
  active?: boolean;
  confirmationId: string;
  confirmationName: string;
  children: React.ReactNode;
}
export function TabButton({ 
    type, 
    active = false, 
    confirmationId,
    confirmationName,
    children 
  }: TabButtonProps) {

    const routeMap: Record<TabType, string> = {
      "action-plan": "ActionPlan",
      "accommodation": "Accommodation",
    };

    return (
      <Link
      href={{
        pathname: `/confirmations/${confirmationId}/${routeMap[type]}`,
        query: { confirmationName },
      }}        
      className={`px-4 py-1 border rounded-3xl shadow-md ${
          active 
            ? 'border-b-2 border-custom text-custom' 
            : 'text-gray-600 hover:text-custom-secondary transition-colors'
        }`}
      >
        {children}
      </Link>
    );
};
// `/confirmations/${confirmationId}?confirmationName=${encodeURIComponent(confirmationName)}`
// /${routeMap[type]