import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLogout from '../hooks/useLogout';
const Logout = () => {
    const { isLoggingOut, handleLogout } = useLogout();

    return (
        <>
            <ToastContainer />
            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-busy={isLoggingOut}
            >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </>
    );
};

export default Logout;
