import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService'; // Update path as needed

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
