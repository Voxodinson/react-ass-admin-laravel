import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import Logo from '../assets/images/logo_nobg.png';

const Navbar = () => {
    const location = useLocation();
    const [isOpenDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown(!isOpenDropdown);
    };
    const getPageName = (pathname) => {
        const pathToPageMap = {
            '/': 'Home',
            '/product_management': 'Product List',
            '/order_management': 'Order List',
            '/user_management': 'User List',
            '/feedback': 'Feedback List',
            '/company_profile': 'Company Profile',
            '/social_media': 'Social Media',
            '/setting': 'Setting'
        }

        const pageName = pathToPageMap[pathname]

        if (!pageName) {
            const segments = pathname.split('/').filter(Boolean)
            return segments.length ? segments[segments.length - 1] : 'Home'
        }

        return pageName
    }

    const pageName = getPageName(location.pathname);

    //confirm dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const openDialog = () => {
        setIsDialogOpen(true);
    }
    const handleConfirm = () => {
        setIsDialogOpen(false);
    };
    
    const handleCancel = () => {
        setIsDialogOpen(false);
    };
    return (
        <div className='w-full h-[70px] flex justify-between px-3 items-center bg-purple-400 border-b-[1px] border-gray-200'>
            <span
                className='capitalize text-[1.2rem]'>
                { pageName }
            </span>
            <div 
                className="relative inline-block text-left">
                <button
                    onClick={toggleDropdown}
                    className="bg-blue-500 w-[50px] h-[50px] rounded-full overflow-hidden text-white px-4 py-2 focus:outline-none">
                    <img 
                        src={Logo} 
                        alt="use profile"
                        className='w-full h-full object-cover'/>
                </button>
                {isOpenDropdown && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul>
                            <li>
                                <button 
                                    onClick={()=> {
                                        openDialog();
                                        if(isDialogOpen === true){
                                            isOpenDropdown === false;
                                        }
                                    }}>
                                    Open Confirm Dialog
                                </button>
                                {isDialogOpen && (
                                    <ConfirmDialog
                                        message="Are you sure?"
                                        onConfirm={handleConfirm}
                                        onCancel={handleCancel}
                                    />
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
