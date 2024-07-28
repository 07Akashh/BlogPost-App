import React, { useCallback } from 'react';
import Profile from '../profile/Profile';
import BlogPostModal from '../post/BlogPostModal';
import UserList from '../user/UserList';
import Logout from '../authentication/Logout';

const Content = ({ activeSection, user, handleProfileUpdate }) => {
    const renderSection = useCallback(() => {
        switch (activeSection) {
            case 'profile':
                return <Profile handleProfileUpdate={handleProfileUpdate} user={user} />;
            case 'home':
                return <BlogPostModal />;
            case 'users':
                return <UserList />;
            case 'logout':
                return <Logout />;
            default:
                return <BlogPostModal />;
        }
    }, [activeSection, handleProfileUpdate, user]);

    return <div className=" w-full p-4">{renderSection()}</div>;
};

export default Content;
