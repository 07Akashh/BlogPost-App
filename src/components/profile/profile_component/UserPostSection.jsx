import React from 'react';
import AddPostButton from './AddPostButton'; // Adjust the path as necessary
import UserPostList from '../../user/UserPostList';

const UserPostsSection = ({ user, posts, handleUpdatePosts, handleDelete, currentUserId }) => (
    
    <div className='mb-36'>
        <div className='flex justify-between items-center px-5'>
            <h2 className='font-semibold text-xl'>Posts by {user.name}</h2>
            <AddPostButton handleUpdatePosts={handleUpdatePosts} />
        </div>
        <hr className='my-8 z-0' />
        <UserPostList posts={posts} onUpdate={handleUpdatePosts} onDelete={handleDelete} currentUserId={currentUserId} />
    </div>
);

export default UserPostsSection;
