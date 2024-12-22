import { useEffect, useState } from 'react';
import { deletePost, getPostsByAuthor } from '../redux/services/BlogPostService';

const usePosts = (userId) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userPosts = await getPostsByAuthor(userId);
                setPosts(userPosts);
            } catch (err) {
                setError(err.message);
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId]);

    const handleUpdatePosts = async () => {
        try {
            const userPosts = await getPostsByAuthor(userId);
            setPosts(userPosts);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            console.log('Post deleted successfully');
            handleUpdatePosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return { posts, error, handleUpdatePosts, handleDelete };
};

export default usePosts;
