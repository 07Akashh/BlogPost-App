import React, { useState } from 'react';
import EditPost from '../post_component/EditPost';
import PostMenu from './PostMenu';
import { isImage, isVideo } from '../../utils/utils';

const PostItem = ({ post, currentUserId, onEditComplete, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({ title: '', content: '', post_url: '' });

    const handleEditClick = () => {
        setIsEditing(true);
        setEditFormData({ title: post.title, content: post.content, post_url: post.post_url });
    };

    const handleEditComplete = (updatedData) => {
        setIsEditing(false);
        if (updatedData) {
            onEditComplete(updatedData);
        }
    };

    return (
        <div className="post-item border rounded-lg p-2 relative cursor-pointer">
            {post.post_url && isImage(post.post_url) && <img src={post.post_url} alt="Post" className='w-full h-44 object-cover' />}
            {post.post_url && isVideo(post.post_url) && <video src={post.post_url} controls className='w-full h-44 border object-cover' />}
            <div className="flex justify-between items-center mt-2">
                <h3 className="font-semibold">{post.title}</h3>
                {post.author._id === currentUserId && (
                    <PostMenu onEditClick={handleEditClick} onDeleteClick={() => onDelete(post._id)} />
                )}
            </div>
            {isEditing ? (
                <EditPost
                    postId={post._id}
                    initialData={editFormData}
                    onEditComplete={handleEditComplete}
                />
            ) : (
                <p>{post.content}</p>
            )}
        </div>
    );
};

export default PostItem;
