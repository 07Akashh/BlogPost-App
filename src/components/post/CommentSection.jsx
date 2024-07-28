import React, { useEffect, useState } from 'react';
import { addComment, getComments } from '../../services/BlogPostService';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComments(postId);
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            console.error('Comment cannot be empty');
            return;
        }
        try {
            await addComment(postId, newComment);
            setNewComment('');
            const updatedComments = await getComments(postId);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <strong>{comment.commenterName} ({comment.commenterUsername}):</strong> {comment.comment}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentSection;
