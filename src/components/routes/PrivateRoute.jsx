import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const PrivateRoute = ({ children }) => {
    const token = AuthService.getCurrentUser();

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
