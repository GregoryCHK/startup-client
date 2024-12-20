'use client'

import { useState } from "react";
import {User, Settings, LogOut} from 'lucide-react';
import Link from "next/link";

const UserButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDownMenu = () => {
        setIsOpen((prev) => !prev);
    };
    

    return (
        <div className="relative">
            <button 
            onClick={toggleDropDownMenu}
            className="flex items-center p-[6px] text-main border-[1px] border-gray-200 rounded-full">
                <User className="h-5 w-5"/>
            </button>

            {/* DropDown Menu */}
            {isOpen && (
                <section className="z-10 absolute w-40 right-0 mt-2 bg-white rounded-md shadow-lg py-1 ">
                    <div className="flex items-center space-x-2 py-4 px-4 text-sm text-gray-700">
                        <User className="h-4 w-4"/>
                        <p>Stella Politaki</p>
                    </div>
                    <hr />
                    <Link href="/userprofile" className="block px-4 py-2 text-sm text-gray-700 hover:text-main">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4"/>
                            <span>Profile</span>
                        </div>
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:text-main">
                        <div className="flex items-center space-x-2">
                            <Settings className="h-4 w-4"/>
                            <span>Settings</span>
                        </div>
                    </Link>
                    <hr />
                    <button onClick={() => console.log('LogOut')} className="block px-4 py-2 text-sm text-gray-700 hover:text-main">
                        <div className="flex items-center space-x-2">
                            <LogOut className="h-4 w-4"/>
                            <span>LogOut</span>
                        </div>
                    </button>
                </section>
                )
            }
        </div>
    )
}

export default UserButton