import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            AuthService.logout();
            toast.success('Logout successful! Redirecting...');
            setTimeout(() => navigate('/login', { state: { key: Date.now() } }), 1000);
        } catch (error) {
            toast.error(`Registration failed: ${error.response?.data?.message || 'An error occurred'}`);
            console.error(error);
        }
    };

    return (
        <>
        <ToastContainer/>
        <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Logout;
