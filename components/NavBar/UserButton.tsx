'use client'

import { useState } from "react";    
import {FaUser} from 'react-icons/fa';

const UserButton = () => {


    const toggleDropDownMenu = () => {

    }

    return (
        <div className="relative">
            <button 
            onClick={toggleDropDownMenu}
            className="flex items-center p-[6px] text-gray-300 border-[1px] border-gray-300 rounded-full">
                <FaUser className="h-5 w-5"/>
            </button>

            {/* DropDown Menu */}
            <div className="absoute border-2 border-black right-0 mt-2 w-36">
                Testing
            </div>
        </div>
    )
}

export default UserButton