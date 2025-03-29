import React from 'react'
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
            className='w-full h-full bg-white relative overflow-hidden rounded-md border-[1px] border-gray-200 '>
            <div 
                className="w-full flex items-center bg-purple-400 justify-center h-[55px] overflow-hidden border-b-[1px] border-gray-200">
                <h1
                    className='text-[1.5rem] font-bold uppercase text-white'>Sneakers</h1>
            </div>
            <div 
                className="h-[calc(100vh-115px)] w-full overflow-auto p-3">
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
                            className={({ isActive }) => `flex gap-3 text-[.8rem] text-gray-800 font-medium hover:bg-purple-100 py-2 px-4 rounded-sm transition ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <LayoutGrid size={18} /> Dashboard
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
                            className={({ isActive }) => `flex gap-3 text-[.8rem] text-gray-800 font-medium hover:bg-purple-100 py-2 px-4 rounded-sm transition ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <LayoutList size={18} /> Products List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/order_management" 
                            className={({ isActive }) => `flex gap-3 text-[.8rem] text-gray-800 font-medium hover:bg-purple-100 py-2 px-4 rounded-sm transition ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <ListChecks size={18}/> Order List
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
                            className={({ isActive }) => `flex gap-3 text-[.8rem] text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <Users size={18}/> Users List
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
                            className={({ isActive }) => `flex gap-3 text-[.8rem] text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <MessagesSquare size={18}/> Feedback
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/company_profile" 
                            className={({ isActive }) => `flex gap-3 text-[.8rem] text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <UserPen size={18}/> Company Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/social_media" 
                            className={({ isActive }) => `flex gap-3 text-[.8rem] text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <GalleryHorizontalEnd size={18}/> Social Media
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/setting" 
                            className={({ isActive }) => `flex gap-3 text-[.8rem] text-gray-800 font-medium hover:bg-purple-300 py-2 px-4 rounded-sm ${isActive ? 'bg-purple-400 text-white hover:bg-purple-400' : ''}`}>
                            <Settings size={18}/> Setting
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div 
                className="w-full absolute bottom-0 h-[60px] px-2 border-t-[1px] border-gray-200 flex items-center justify-center bg-white z-20">
                <button
                    className='flex gap-3 px-4 py-2 bg-purple-400 hover:bg-purple-300 cursor-pointer w-full rounded-sm text-white'>
                    <LogOut />Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar;