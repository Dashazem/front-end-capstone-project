import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, role }) => {
    const auth = useSelector((state) => state.auth);
  
    if (!auth.email) {
        return <Navigate to="/login" />;
    }

    if (role && auth.role !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;

