import React, { useCallback, useEffect, useState } from 'react';
import UserService from '../services/UserService';
import Content from './home/Content';
import Sidebar from './home/Sidebar';
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState(localStorage.getItem('activeSection') || 'home');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await UserService.getProfile();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        localStorage.setItem('activeSection', activeSection);
    }, [activeSection]);

    const handleProfileUpdate = useCallback(async () => {
        try {
            const updatedUser = await UserService.getProfile();
            setUser(updatedUser);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex w-full h-screen border fixed">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <Content activeSection={activeSection} user={user} handleProfileUpdate={handleProfileUpdate} />
        </div>
    );
};

export default Dashboard;
