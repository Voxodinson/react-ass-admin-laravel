import React from 'react'
import Logo from '../assets/images/logo_nobg.png';
import { BrowserRouter as Link } from 'react-router-dom';
import { 
    Home 
} from 'lucide-react';
const Sidebar = () => {
    return (
        <div
            className='w-full h-full'>
            <div 
                className="w-full flex items-center justify-center h-[70px] overflow-hidden border-b-[1px] border-gray-200">
                <img 
                    src={Logo} 
                    alt="logo"
                    className='w-[220px] h-full object-cover mt-2' />
            </div>
            <div 
                className="h-[calc(100vh-70px)] overflow-auto">
                <ul>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                        <Home />
                        <Link to="/" className="text-gray-800 font-medium">Product List</Link>
                    </li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                        <Home />
                        <Link to="/product_list" className="text-gray-800 font-medium">Product List</Link>
                    </li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                        <Home />
                        <Link to="/user_management" className="text-gray-800 font-medium">About</Link> {/* Text added here */}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;