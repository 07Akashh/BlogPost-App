import React, { useEffect, useState } from 'react';
import { deletePost, getPostsByAuthor } from '../../services/BlogPostService';
import UserService from '../../services/UserService';
import ProfileHeader from './profile_component/ProfileHeader';
import { getInitials } from '../utils/utils';
import UserPostsSection from './profile_component/UserPostSection';

const Profile = ({ handleProfileUpdate, user, handleClose }) => {

    const [currentUserId, setCurrentUserId] = useState(null);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await UserService.getProfile();
                setCurrentUserId(userData._id);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userPosts = await getPostsByAuthor(user._id);
                setPosts(userPosts);
            } catch (err) {
                setError(err.message);
            }
        };

        if (user._id) {
            fetchPosts();
        }
    }, [user._id]);

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            console.log('Post deleted successfully');
            handleUpdatePosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const shouldShowModal = user._id === currentUserId;

    const handleUpdatePosts = () => {
        getPostsByAuthor(user._id).then(setPosts).catch(setError);
    };

    return (
        <div className=''>
            <div >
                <div>
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
                            handleProfileUpdate
                            closeButton={handleClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
