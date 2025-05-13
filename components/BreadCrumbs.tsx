// components/BreadCrumbs.tsx
'use client';

import { usePathname, useSearchParams } from "next/navigation";  
import Link from "next/link";
import { ChevronRight } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { fetchConfirmationById } from "@/lib/api/confirmations";
import React from "react";

function BreadCrumbs() {
  const paths = usePathname();
  const pathSegments = paths.split("/").filter(path => path);
  const searchParams = useSearchParams();
  const confirmationId = pathSegments[1]; // Get ID from URL

  // Mapping for URL segments to display names
  const displayNameMap: Record<string, string> = {
    'action-plan': 'Action Plan',
    'accommodation': 'Accommodation',
    // Add other mappings as needed
  };
  
  // Fetch confirmation name if not in query params
  const { data: confirmation } = useQuery({
    queryKey: ['confirmation-name', confirmationId],
    queryFn: () => fetchConfirmationById(confirmationId),
    enabled: !!confirmationId && pathSegments[0] === 'confirmations'
  });

  // Get name from query params or fetched data
  const confirmationName = searchParams.get('confirmationName') || confirmation?.name;

  return (
    <div className="mt-2 px-4">
      <ul className="flex items-center space-x-1">
        <li className="breadcrumbs"><Link href="/">Home</Link></li>
        {pathSegments.length > 0 && <ChevronRight className="inline-block h-3 w-3 text-custom" />}
        {pathSegments.map((link, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          let nameLink = link[0].toUpperCase() + link.slice(1);
          const isLast = pathSegments.length === index + 1;
          
          // Apply display name transformation
          if (displayNameMap[link]) {
            nameLink = displayNameMap[link];
          }

          // Replace with confirmation name if available
          if (index === 1 && confirmationName) {
            nameLink = decodeURIComponent(confirmationName);
          }

          return (
            <React.Fragment key={index}>
              <li className={isLast ? "text-custom-secondary text-xs hover:cursor-default" : "breadcrumbs"}>
                {isLast ? 
                  (<span>{nameLink}</span>)
                  :(<Link href={{
                    pathname: href,
                    query: index === 1 ? { confirmationName } : undefined
                  }}>{nameLink}</Link>)
                }
              </li>
              {pathSegments.length !== index + 1 && <ChevronRight className="inline-block h-3 w-3 text-custom" />}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default BreadCrumbs;