import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from "../../redux/slices/blogPostSlice";
import { PostCard } from "./PostCard";

const PostsList = () => {
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
        <div className="justify-center h-screen flex">
            <div className="items-center overflow-scroll no-scrollbar justify-center min-h-screen w-full">
                <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 sm:mb-10">
                    {posts.map((post) => (
                        <li key={post._id}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostsList;
