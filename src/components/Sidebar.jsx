import React from 'react'
import Logo from '../assets/images/logo_nobg.png';
import { NavLink } from 'react-router-dom';
import {
    LayoutGrid,
    LayoutList,
    Settings,
    UserPen,
    LogOut,
    ListChecks,
    Users,
    MessagesSquare,
    GalleryHorizontalEnd
} from 'lucide-react';
const Sidebar = () => {
    return (
        <div
            className='w-full h-full bg-white relative '>
            <div 
                className="w-full flex items-center bg-purple-400 justify-center h-[70px] overflow-hidden border-b-[1px] border-gray-200">
                <img 
                    src={Logo} 
                    alt="logo"
                    className='w-[220px] h-full object-cover mt-2' />
            </div>
            <div 
                className="h-[calc(100vh-70px)] w-full overflow-auto p-3">
                <ul 
                    className='flex flex-col gap-4 *:w-full'>
                    <li 
                        className='w-full border-b-[1px] border-gray-200'>
                        <span
                            className='font-seminbold'>Home</span>
                    </li>
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => `flex gap-3 text-gray-800 font-medium hover:bg-purple-100 py-2 px-4 rounded-sm transition ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <LayoutGrid /> Dashboard
                        </NavLink>
                    </li>
                    <li 
                        className='w-full border-b-[1px] border-gray-200'>
                        <span
                            className='font-seminbold'>Product Management</span>
                    </li>
                    <li>
                        <NavLink 
                            to="/product_management" 
                            className={({ isActive }) => `flex gap-3 text-gray-800 font-medium hover:bg-purple-100 py-2 px-4 rounded-sm transition ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <LayoutList /> Products List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/order_management" 
                            className={({ isActive }) => `flex gap-3 text-gray-800 font-medium hover:bg-purple-100 py-2 px-4 rounded-sm transition ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <ListChecks /> Order List
                        </NavLink>
                    </li>
                    <li 
                        className='w-full border-b-[1px] border-gray-200'>
                        <span
                            className='font-seminbold'>User Management</span>
                    </li>
                    <li>
                        <NavLink 
                            to="/user_management" 
                            className={({ isActive }) => `flex gap-3 text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <Users /> Users List
                        </NavLink>
                    </li>
                    <li 
                        className='w-full border-b-[1px] border-gray-200'>
                        <span
                            className='font-seminbold'>Genaral Setting</span>
                    </li>
                    <li>
                        <NavLink 
                            to="/feedback" 
                            className={({ isActive }) => `flex gap-3 text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <MessagesSquare /> Feedback
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/company_profile" 
                            className={({ isActive }) => `flex gap-3 text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <UserPen /> Company Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/social_media" 
                            className={({ isActive }) => `flex gap-3 text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <GalleryHorizontalEnd /> Social Media
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/setting" 
                            className={({ isActive }) => `flex gap-3 text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <Settings /> Setting
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div 
                className="w-full absolute bottom-0 py-3 px-1 border-t-[1px] border-gray-200 flex items-center justify-center bg-white h-fit z-20">
                <button
                    className='flex gap-3 px-4 py-2 bg-purple-400 hover:bg-purple-300 cursor-pointer w-[calc(100%-16px)] rounded-sm text-white'>
                    <LogOut />Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar;