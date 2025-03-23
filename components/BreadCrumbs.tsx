'use client'

import { usePathname, useSearchParams } from "next/navigation";  
import Link from "next/link";
import { ChevronRight } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { fetchConfirmationById, fetchConfirmations } from "@/lib/api/confirmations";
import { Confirmation } from "@/types/confirmations";
import { useQuery } from "@tanstack/react-query";

function BreadCrumbs() {
    
    const paths = usePathname();
    const pathSegments = paths.split("/").filter(path => path);
    const searchParams = useSearchParams(); 

    // Extract client name from query params (if available)
    const clientName = searchParams.get('confirmationName'); // This will extract 'name' from the query (url) string

  return (
    <div className="mt-2 px-4">
        <ul className="flex items-center space-x-1">
            <li className="breadcrumbs"><Link href="/">Home</Link></li>
            {pathSegments.length > 0 && <ChevronRight className="inline-block h-3 w-3 text-custom" />}
            {
               pathSegments.map((link, index) => {
                let href = `/${pathSegments.slice(0, index + 1).join('/')}`
                let nameLink = link[0].toUpperCase() + link.slice(1)
                const isLast = pathSegments.length === index + 1;

                // If we're on the confirmation page, replace with the client name
                if (index === 1 && clientName) {
                    nameLink = clientName;
                };

                return (
                    <React.Fragment key={index}>
                        <li className={isLast ? "text-custom-secondary text-xs hover:cursor-default" : "breadcrumbs"}>
                            {isLast ? 
                            (<span>{nameLink}</span>)
                            :(<Link href={href}>{nameLink}</Link>)
                            }
                        </li>
                        {pathSegments.length !== index + 1 && <ChevronRight className="inline-block h-3 w-3 text-custom" />}
                    </React.Fragment>
                )
               }
            )
            }
        </ul>
        {/* Error Message
        {isError && (
            <div className="text-red-500 text-xs mt-1">
            Failed to load confirmation: {error instanceof Error ? error.message : "Unknown error"}
            </div>
         )} */}
    </div>
  )
}

export default BreadCrumbs;