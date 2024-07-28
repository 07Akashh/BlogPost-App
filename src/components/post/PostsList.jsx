import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../services/BlogPostService';
import { getInitials, getTimeSinceCreation } from '../utils/utils';
import PostActions from './post_component/PostActions';
import PostContent from './post_component/PostContent';
import PostMedia from './post_component/PostMedia';
import UserInfo from './post_component/UserInfo';

const PostsList = ({ onPostClick }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getUserPosts();
                setPosts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='justify-center h-screen flex'>
            <div className='items-center overflow-scroll no-scrollbar justify-center min-h-screen w-full  lg:w-2/3'>
                <ul className='w-full mb-16 sm:mb-10'>
                    {posts.map(post => (
                        <li className="rounded-xl border p-5 shadow-md w-full bg-white mb-5" key={post._id}>
                            <UserInfo
                                author={post.author}
                                createdAt={post.createdAt}
                                getTimeSinceCreation={getTimeSinceCreation}
                                getInitials={getInitials}
                            />
                            <PostMedia postUrl={post.post_url} />
                            <PostContent title={post.title} content={post.content} />
                            <PostActions onPostClick={() => onPostClick(post._id)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostsList;
