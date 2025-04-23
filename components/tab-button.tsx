import Link from 'next/link';
import React from 'react'

export default function TabButton({ 
    href, 
    active = false, 
    children 
  }: { 
    href: string, 
    active?: boolean, 
    children: React.ReactNode 
  }) {
    return (
      <Link
        href={href}
        className={`px-4 border rounded-3xl shadow-md  ${
          active 
            ? 'border-b-2 border-blue-500 text-blue-600' 
            : 'text-gray-600 hover:text-custom-secondary'
        }`}
      >
        {children}
      </Link>
    );
};
