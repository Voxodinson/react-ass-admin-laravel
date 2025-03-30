import { useState } from "react";
import { login } from "../services/authService";
import TextField from '@mui/material/TextField';
import EcomBG from '../assets/images/ecom_bg.jpg';
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            localStorage.setItem("user", JSON.stringify(userData));
            window.location.href = "/"; // Redirect to dashboard
        } catch (error) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="p-8 rounded-lg w-1/2">
                <h2 className="text-[2rem] uppercase font-semibold mb-4 text-purple-400 text-center">
                    Admin Login
                    </h2>
                <p
                    className="text-[.8rem] text-gray-400 text-center">Login in the system with Email and Password</p>
                <form onSubmit={handleLogin}>
                    <div className="my-6">
                        <TextField
                            type="email"
                            value={email}
                            id="email"
                            label="Email"
                            variant="filled"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-2"
                        />
                    </div>
                    <div className="my-6">
                        <TextField
                            id="password"
                            label="Password"
                            variant="filled"
                            type="password"
                            value={password}
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-2"/>
                        <p
                            className="text-[.8rem] text-end text-gray-500 mt-2">
                            Forget password? 
                            <Link
                                to="*"
                                className=" hover:underline cursor-pointer">
                                &ensp; Contact super admin to change password
                            </Link>
                        </p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button 
                            type="submit" 
                            className="w-full bg-purple-400 text-white py-2 rounded-sm hover:bg-purple-300 transition duration-200">
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 h-[100vh] bg-gray-300">
                <img 
                    src={EcomBG} 
                    alt="bg image"
                    className="w-full h-full object-cover cursor-pointer" />
            </div>
        </div>
    );
};

export default Login;
