import React from 'react';
import useProfile from '../hooks/useProfile';
import usePosts from '../hooks/usePosts';
import ProfileContent from './profile_component/ProfileContent';

const Profile = ({ handleProfileUpdate, user, handleClose }) => {
    const { currentUserId, error: profileError } = useProfile();
    const { posts, error: postsError, handleUpdatePosts, handleDelete } = usePosts(user._id);

    const error = profileError || postsError;

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
