import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Sidebar } from "../src/components";
import Layout from "./Layout";
import LoginLayout from "./LoginLayout";
// Pages
import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import Page404 from "./pages/Page404";
import Setting from "./pages/Setting";
import CompanyProfile from "./pages/CompanyProfile";
import SocialMedia from "./pages/SocialMedia";
import Feedback from "./pages/Feedback";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

// Assuming you're using Context API for auth (you can adjust according to your auth setup)
import { useAuth } from "./context/AuthContext";

function App() {
    useEffect(() => {
        // Optionally, you could perform any authentication checks here, e.g., by checking cookies or localStorage.
    }, []);

    return (
        <div className="w-full h-[100vh] flex p-2 gap-2">
            <div className="w-[20%]">
                <Sidebar />
            </div>

            <div className="w-[calc(100%-20%)] bg-gray-400 rounded-md overflow-hidden border-[1px] border-gray-200">
                <Navbar />
                <div className="h-[calc(100%-55px)] overflow-auto bg-white pr-1">
                    <Routes>
                        {/* If not authenticated, redirect to Login */}
                        { false ? (
                            <Route element={<LoginLayout/>}>
                                <Route path="/login" element={<Login />} />
                            </Route>
                        ) : (
                            <Route element={<Layout />}>
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
                        )}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
