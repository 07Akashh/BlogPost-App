import React, { useEffect, useState } from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addComment, getComments } from '../../../redux/services/BlogPostService';
import { fetchProfileData } from '../../utils/userProfile';
import { getInitials } from '../../utils/utils';

const CommentSectionComponent = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await fetchProfileData();
                setProfile(data);
            } catch (error) {
                toast.error('Failed to fetch profile data.')
                setError('Failed to fetch profile data.');
            }
        };
        getProfile();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComments(postId);
                setComments(data);
            } catch (error) {
                toast.error('Error in fetching Comment')
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);


    const handleCommentSubmit = async (text) => {
        if (!text.trim()) {
            console.error('Comment cannot be empty');
            return;
        }
        try {
            await addComment(postId, text);
            const updatedComments = await getComments(postId);
            setComments(updatedComments);
        } catch (error) {
            toast.error('Error in adding Comment')
            console.error('Error adding comment:', error);
        }
    };

    if (error) return <div>{error}</div>;
    if (!profile) return <div>Loading...</div>;

    const formattedComments = comments.map(comment => ({
        userId: comment._id,
        comId: comment._id,
        fullName: comment.commenterName,
        text: comment.comment,
        avatarUrl: comment.commenterProfile ? comment.commenterProfile : `https://ui-avatars.com/api/name=${getInitials(comment.commenterName)}&background=random`,
        replies: []
    }));

    return (
        <>
        <ToastContainer />
            <CommentSection
                currentUser={{
                    currentUserId: profile.username,
                    currentUserProfile:profile._id,
                    currentUserFullName: profile.name
                }}
                logIn={{
                    loginLink: 'http://localhost:3001/',
                    signupLink: 'http://localhost:3001/'
                }}
                commentData={formattedComments}
                onSubmitAction={({ text }) => {
                    handleCommentSubmit(text);
                }}
            />
        </>
    );
};

export default CommentSectionComponent;
