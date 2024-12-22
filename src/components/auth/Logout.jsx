import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLogout from '../../hooks/useLogout';
const Logout = () => {
    const { isLoggingOut, handleLogout } = useLogout();

    useEffect(() => {
        document.title = 'BlogPost';
    }, []);

    return (
        <>
            <ToastContainer />
            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-black text-white rounded hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                aria-busy={isLoggingOut}
            >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </>
    );
};

export default Logout;
