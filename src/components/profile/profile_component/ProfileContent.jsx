import React from 'react';
import ProfileHeader from './profile_content/ProfileHeader';
import UserPostsSection from './profile_content/UserPostSection';
import { getInitials } from '../../utils/utils';

const ProfileContent = ({
    user,
    currentUserId,
    posts,
    error,
    handleProfileUpdate,
    handleUpdatePosts,
    handleDelete,
    handleClose,
}) => {
    const shouldShowModal = user._id === currentUserId;

    return (
        <div className='h-screen overflow-scroll mt-5 px-0 xl:px-10 no-scrollbar'>
            <ProfileHeader
                user={user}
                currentUserId={currentUserId}
                shouldShowModal={shouldShowModal}
                handleProfileUpdate={handleProfileUpdate}
                getInitials={getInitials}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <hr className='my-8' />
            <UserPostsSection
                user={user}
                posts={posts}
                shouldShowModal={shouldShowModal}
                handleUpdatePosts={handleUpdatePosts}
                currentUserId={currentUserId}
                handleDelete={handleDelete}
                closeButton={handleClose}
            />
        </div>
    );
};

export default ProfileContent;
