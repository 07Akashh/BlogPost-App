import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchProfile } from '../redux/slices/authSlice';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { token, user, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token && !user) {
            dispatch(fetchProfile());
        }
    }, [token, user, dispatch]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return children;
};

export default PrivateRoute;
