import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostHeader from '../../components/post/post_content/PostHeader';
import { getBlogPostById } from '../../redux/services/BlogPostService';
import { PostDetailMedia } from '../../components/post/post_content/PostMedia';
import { PostDetailContent } from '../../components/post/post_content/PostContent';

const BlogPostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className='justify-center my-5 flex w-full'>
                <div className="flex items-center justify-center min-h-screen bg-transparent w-full">
                    <div className="rounded-xl p-5 shadow-md w-full h-full bg-white">
                        <PostHeader author={post?.author} createdAt={post?.createdAt} />
                        <PostDetailMedia postUrl={post.post_url} />
                        <PostDetailContent title={post.title} content={post.content} date={post.createdAt} summary={post?.summary} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPostDetail;
