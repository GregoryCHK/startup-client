import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    
    const pathname = usePathname();
  
  // Determine if the current route matches this tab's route
  const isActive = pathname === `/confirmations/${confirmationId}/${type}`;

    return (
      <Link
      href={{
        pathname: `/confirmations/${confirmationId}/${type}`,
        query: { confirmationName },
      }}        
      className={`px-4 py-1 border rounded-3xl shadow-md   ${
          isActive 
            ? 'border border-b-4 border-custom-secondary text-custom' 
            : 'text-gray-600 hover:text-custom-secondary transition-colors'
            
        }`}
      >
        {children}
      </Link>
    );
};
// `/confirmations/${confirmationId}?confirmationName=${encodeURIComponent(confirmationName)}`
// /${routeMap[type]