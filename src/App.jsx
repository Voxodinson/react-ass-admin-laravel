import React from "react";
import { Routes, Route } from "react-router-dom";
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

// Auth Context
import { useAuth } from "./context/AuthContext";

function App() {
    const { user } = useAuth();

    return (
        <div className={`w-[100vw] h-[100vh] items-start justify-start flex gap-2 bg-gray-100 p-${user ? '2' : '0'}`}>
            {user && (
                <div className="w-[20%] h-full sticky top-0">
                    <Sidebar />
                </div>
            )}
            <div className="w-[80%] h-[calc(100vh-20.3vh)]">
                {user && <Navbar />}
                <Routes>
                    {!user && (
                        <Route path="/" element={<LoginLayout />}>
                            <Route path="/" element={<Login />} />
                        </Route>
                    )}
                    {user && (
                        <Route element={<Layout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/product_management" element={<ProductList />} />
                            <Route path="/user_management" element={<UserManagement />} />
                            <Route path="/company_profile" element={<CompanyProfile />} />
                            <Route path="/social_media" element={<SocialMedia />} />
                            <Route path="/order_management" element={<Orders />} />
                            <Route path="/feedback" element={<Feedback />} />
                            <Route path="/setting" element={<Setting />} />
                        </Route>
                    )}
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
