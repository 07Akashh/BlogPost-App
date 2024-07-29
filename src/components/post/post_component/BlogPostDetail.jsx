import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBlogPostById } from '../../../services/BlogPostService';
import CommentPostActions from '../post_content/CommentPostAction';
import PostContent from '../post_content/PostContent';
import PostHeader from '../post_content/PostHeader';
import PostMedia from '../post_content/PostMedia';
import CommentSection from './CommentSection';

const BlogPostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showComments, setShowComments] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getBlogPostById(id);
                setPost(data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to fetch post.');
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const toggleComments = (postId) => {
        setShowComments((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className='justify-center flex w-full'>
                <div className="flex items-center justify-center min-h-screen bg-transparent w-full">
                    <div className="rounded-xl p-5 shadow-md w-full h-full bg-white">
                        <PostHeader author={post?.author} createdAt={post?.createdAt} />
                        <PostMedia postUrl={post.post_url} />
                        <PostContent title={post.title} content={post.content} />
                        <CommentPostActions postId={post._id} toggleComments={toggleComments} />
                        {showComments[post._id] && <CommentSection postId={post._id} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPostDetail;
