import React, { useEffect } from 'react';
import ProfileContent from './ProfileContent';
import usePosts from '../../hooks/usePosts';
import useProfile from '../../hooks/useProfile';

const Profile = ({ handleProfileUpdate, user, handleClose }) => {
    const { currentUserId, error: profileError } = useProfile();
    const { posts, error: postsError, handleUpdatePosts, handleDelete } = usePosts(user._id);

    const error = profileError || postsError;

    useEffect(() => {
        if (user && user.name) {
            document.title = `${user.name}'s Profile`;
        } else {
            document.title = 'Profile';
        }
    }, [user]);

    return (
        <div className=''>
            <div>
                <div>
                    <ProfileContent
                        user={user}
                        currentUserId={currentUserId}
                        posts={posts}
                        error={error}
                        handleProfileUpdate={handleProfileUpdate}
                        handleUpdatePosts={handleUpdatePosts}
                        handleDelete={handleDelete}
                        handleClose={handleClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
