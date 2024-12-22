'use client'

import { usePathname } from "next/navigation";  
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

import React from 'react'

function BreadCrumbs() {
    
    const paths = usePathname()
    const pathSegments = paths.split("/").filter(path => path)

    /*If at Home Page dont show the path at all*/
    /*
    if (pathSegments.length === 0) {
        return null;
    }
    */

  return (
    <div>
        <ul className="mt-2 mx-auto px-4 flex items-center space-x-1">
            <li className="breadcrumbs"><Link href="/">Home</Link></li>
            {pathSegments.length > 0 && <ArrowRight className="inline-block h-2 w-3 text-secondary-custom" />}
            {
               pathSegments.map((link, index) => {
                let href = `/${pathSegments.slice(0, index + 1).join('/')}`
                let nameLink = link[0].toUpperCase() + link.slice(1)
                const isLast = pathSegments.length === index + 1;

                return (
                    <React.Fragment key={index}>
                        <li className={isLast ? "text-secondary-custom text-xs hover:cursor-default" : "breadcrumbs"}>
                            {isLast ? 
                            (<span>{nameLink}</span>)
                            :(<Link href={href}>{nameLink}</Link>)
                            }
                        </li>
                        {pathSegments.length !== index + 1 && <ArrowRight className="inline-block h-2 w-3 text-secondary-custom" />}
                    </React.Fragment>
                )
               }
            )
            }
        </ul>
    </div>
  )
}

export default BreadCrumbs