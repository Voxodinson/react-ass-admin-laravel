import React from 'react';
import { Outlet} from "react-router-dom";
const Layout = () =>{
    return(
        <div className="w-screen h-[100vh] flex">
            <Outlet/>
        </div>
    )
}

export default Layout;