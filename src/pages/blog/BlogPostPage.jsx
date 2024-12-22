import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../../redux/slices/blogPostSlice';
import { PostCard, PostListCard } from '../../components/post/PostCard';

const BlogPostPage = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.blogPost);

    useEffect(() => {
        dispatch(fetchUserPosts());
        document.title = 'BlogPost';
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <section className="w-full px-4 py-6">
            <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="col-span-1">
                        {posts[1] && <PostCard post={posts[1]} />}
                    </div>
                    <div className="col-span-1 grid grid-rows-2 gap-5">
                        {posts[1] && <PostListCard post={posts[1]} />}
                        {posts[2] && <PostListCard post={posts[2]} />}
                    </div>
                </div>
                <div className="mt-5">
                    {posts[3] && <PostListCard post={posts[3]} />}
                </div>
            </section>
            <section >
            <h2 className="text-2xl font-bold mb-6">All Blog Posts</h2>
            <div className="justify-center flex">
            <div className="items-center overflow-scroll no-scrollbar justify-center w-full">
                <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 sm:mb-10">
                    {posts.map((post) => (
                        <li key={post._id}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
            </section>
        </div>
    );
};

export default BlogPostPage;

