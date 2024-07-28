import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '../../services/BlogPostService';
import CommentSection from './CommentSection';
import PostActions from './post_component/PostActions';
import PostContent from './post_component/PostContent';
import PostHeader from './post_component/PostHeader';
import PostMedia from './post_component/PostMedia';

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
        <div className='justify-center flex w-full'>
            <div className="flex items-center justify-center min-h-screen bg-transparent w-full">
                <div className="rounded-xl p-5 shadow-md w-full h-full bg-white">
                    <PostHeader author={post?.author} createdAt={post?.createdAt} />
                    <PostMedia postUrl={post.post_url} />
                    <PostContent title={post.title} content={post.content} />
                    <PostActions postId={post._id} toggleComments={toggleComments} />
                    {showComments[post._id] && <CommentSection postId={post._id} />}
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetail;
