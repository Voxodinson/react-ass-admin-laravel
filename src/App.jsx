import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar, Sidebar} from '../src/components/index'
import Layout from "./Layout";

import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import Page404 from "./pages/Page404";
import Setting from "./pages/Setting";
import CompanyProfile from "./pages/CompanyProfile";
import SocialMedia from "./pages/SocialMedia";
import Feedback from "./pages/Feedback";
import Orders from "./pages/Orders";

function App() {
    return (
        <div 
            className="w-full h-[100vh] flex p-2 gap-2">
            <div 
                className="w-[20%]">
                <Sidebar/>
            </div>
            <div className="w-[calc(100%-20%)] bg-gray-400 rounded-md overflow-hidden border-[1px] border-gray-200">
                <Navbar/>
                <div className="h-[calc(100%-55px)] overflow-auto bg-white pr-1">
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/product_management" element={<ProductList />} />
                            <Route path="/user_management" element={<UserManagement />} />
                            <Route path="/company_profile" element={<CompanyProfile />} />
                            
                            <Route path="/social_media" element={<SocialMedia />} />
                            <Route path="/order_management" element={<Orders />} />
                            <Route path="/feedback" element={<Feedback />} />

                            <Route path="/setting" element={<Setting />} />
                            <Route path="*" element={<Page404 />} />
                        </Route>
                    </Routes>
                </div>
            </div>
      </div>
    );
}
export default App;
