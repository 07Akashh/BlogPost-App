import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../../services/AuthService';

const useLogout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await AuthService.logout();
            toast.success('Logout successful! Redirecting...');
            setTimeout(() => navigate('/login', { state: { key: Date.now() } }), 1000);
        } catch (error) {
            toast.error(`Logout failed: ${error.response?.data?.message || 'An error occurred'}`);
            console.error(error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return { isLoggingOut, handleLogout };
};

export default useLogout;
