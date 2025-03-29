// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false); // Track authentication state

    // Example of how you could check authentication (this logic should be customized)
    const checkAuth = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthenticated(true); // or some logic to check if the token is valid
        }
    };

    const login = (token) => {
        localStorage.setItem("token", token);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
