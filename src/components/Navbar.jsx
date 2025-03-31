import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import UserPhoto from '../assets/images/user_image.jpg';

const Navbar = () => {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpenDialog, setOpenDialog] = useState(false);
    const openPopover = Boolean(anchorEl);

    const { logout } = useAuth();

    const getPageName = (pathname) => {
        const pathToPageMap = {
            "/": "Home",
            "/product_management": "Product List",
            "/order_management": "Order List",
            "/user_management": "User List",
            "/feedback": "Feedback List",
            "/company_profile": "Company Profile",
            "/social_media": "Social Media",
            "/setting": "Setting",
        };
        return pathToPageMap[pathname] || pathname.split("/").filter(Boolean).pop() || "Home";
    };

    const pageName = getPageName(location.pathname);

    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = () => {
        handleClosePopover();
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirm = () => {
        logout();
        setOpenDialog(false);
    };
    
    return (
        <div className="w-full h-[55px] border-[1px] rounded-md border-gray-200 flex justify-between overflow-hidden px-3 items-center bg-white">
            <span className="capitalize text-[1.2rem]">
                {pageName}
            </span>
            <div>
                <Button
                    variant="none"
                    className="w-[70px] cursor-pointer h-[70px] transition p-0 rounded-full overflow-hidden"
                    onClick={handleOpenPopover}>
                    <img
                        src={UserPhoto}
                        alt="user profile"
                        className="w-full" />
                </Button>
                <Popover
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}>
                    <Typography sx={{ p: 2 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            className="pr-10 flex gap-10"
                            onClick={handleOpenDialog}>
                            <LogOut /> Logout
                        </Button>
                    </Typography>
                </Popover>
                <ConfirmDialog
                    open={isOpenDialog}
                    onConfirm={handleConfirm}
                    onClose={handleCloseDialog}
                    title="Are you sure! You want to sign out?"
                    description="This will log you out of the application."
                />
            </div>
        </div>
    );
};

export default Navbar;


