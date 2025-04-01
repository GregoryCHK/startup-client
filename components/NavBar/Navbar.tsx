import React from 'react';
import Link from 'next/link';

import UserButton from "@/components/navbar/user-button";
import { Separator } from '../ui/separator';

import {Calendar, CheckSquare} from 'lucide-react';

type MenuItem = {
    name: string;
    href: string;
}

const menuitmes: MenuItem[] = [
    {name:'Inquiries', href:'/inquiries'},
    {name:'Confirmations', href:'/confirmations'},
    {name:'Library', href:'/library'},
    {name:'Inbox', href:'/inbox'},
]

function NavBar() {
  return (
    <nav className='bg-white shadow-sm'>
        <div className='mx-auto px-4'>
            <div className="flex justify-between items-center h-14">
                <Link href='/' className='text-2xl font-semibold text-custom'>
                    Logo
                </Link>
                <div className="hidden md:flex items-center h-full">
                    {menuitmes.map((item, index) => (
                        <React.Fragment key={item.name}>
                            <Link href={item.href} className="menulinks">
                                {item.name}
                            </Link>

                            {/* Add a separator after each link except the last one */}
                            {index < menuitmes.length - 1 && (
                                <Separator orientation="vertical" className="text-foreground mx-2 h-4" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className='flex items-center space-x-3'>
                    <Link href='/tasks' className='hover:text-custom transition-colors duration-200'>
                        <CheckSquare className="h-4 w-4" />
                    </Link>
                    <Link href='/calendar' className='hover:text-custom transition-colors duration-200'>
                        <Calendar className="h-4 w-4" />
                    </Link>
                    <UserButton firstName='Stella' lastName='Politaki'/>
                </div>
            </div>
        </div>

    </nav>
  )
}

export default NavBar