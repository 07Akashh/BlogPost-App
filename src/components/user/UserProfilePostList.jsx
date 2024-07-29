import React, { useEffect, useState } from 'react';
import PostItem from '../post/user_profile_post/PostItem';
import { toast, ToastContainer } from 'react-toastify';

const UserProfilePostList = ({ posts = [], onDelete, currentUserId }) => {
    const [updatedPosts, setUpdatedPosts] = useState(posts);

    useEffect(() => {
        setUpdatedPosts(posts);
    }, [posts]);

    const handleEditComplete = (updatedData) => {
        try {
            if (updatedData) {
                const newPosts = updatedPosts.map((post) =>
                    post._id === updatedData._id ? updatedData : post
                );
                setUpdatedPosts(newPosts);
                toast.success('Post Updated Successfully');
            }
        } catch (error) {
            toast.error("Failed to update post data.");
            console.error("Error updating posts:", error);
        }
    };
    

    const handleDelete = (postId) => {
        const newPosts = updatedPosts.filter(post => post._id !== postId);
        setUpdatedPosts(newPosts);
        if (onDelete) {
            onDelete(postId);
        }
    };

    return (
        <>
            <ToastContainer/>
            {updatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 z-0">
                    {updatedPosts.map((post) => (
                        <PostItem
                            key={post._id}
                            post={post}
                            currentUserId={currentUserId}
                            onEditComplete={handleEditComplete}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <p>No posts available.</p>
            )}
        </>
    );
};

export default UserProfilePostList;
