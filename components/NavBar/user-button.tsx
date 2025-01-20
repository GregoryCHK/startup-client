'use client'

import { useState, useEffect, useRef } from "react";
import {User, Settings, LogOut} from 'lucide-react';
import Link from "next/link";
import UserAvatar from "./user-avatar";

type UserButtonProps = {
    firstName: string;
    lastName: string;
}

const UserButton = ({firstName, lastName}: UserButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleDropDownMenu = () => {
        setIsOpen((prev) => !prev);
    };

    // Close the dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <button 
            onClick={toggleDropDownMenu}
            ref={buttonRef}
            className="flex items-center p-[6px] text-custom ">
                <UserAvatar src="https://i.pravatar.cc///300" alt={`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}/>
            </button>

            {/* DropDown Menu */}
            {isOpen && (
                <section ref={dropdownRef} className="z-10 absolute w-40 right-0 mt-2 bg-white rounded-md shadow-lg py-1 ">
                    <div className="flex items-center space-x-2 py-4 px-4 text-sm text-gray-700">
                        {/* <User className="h-4 w-4"/> */}
                        <UserAvatar src="https://i.pravatar.cc///300" alt={`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}/>
                        <p>{`${firstName} ${lastName}`}</p>
                    </div>
                    <hr />
                    <Link href="/userprofile" className="block px-4 py-2 text-sm text-gray-700 hover:text-custom">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4"/>
                            <span>Profile</span>
                        </div>
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:text-custom">
                        <div className="flex items-center space-x-2">
                            <Settings className="h-4 w-4"/>
                            <span>Settings</span>
                        </div>
                    </Link>
                    <hr />
                    <button onClick={() => console.log('LogOut')} className="block px-4 py-2 text-sm text-gray-700 hover:text-custom">
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