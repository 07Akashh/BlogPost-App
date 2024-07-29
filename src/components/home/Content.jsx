import React, { useCallback } from 'react';
import Logout from '../authentication/Logout';
import BlogPostModal from '../post/post_component/BlogPostModal';
import Profile from '../profile/Profile';
import UserList from '../user/UserList';

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
