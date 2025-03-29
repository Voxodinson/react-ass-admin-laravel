import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component }) => {
    const { authenticated } = useAuth();

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return component;
};

export default PrivateRoute;
