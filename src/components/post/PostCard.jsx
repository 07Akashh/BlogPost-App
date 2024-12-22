import React from 'react';
import { Link } from 'react-router-dom';
import { PostMedia } from './post_content/PostMedia';
import { PostContent } from './post_content/PostContent';

const PostCard = ({ post }) => {
    return (
        <>
            <Link to={`/post/${post._id}`}>
                <PostMedia postUrl={post.post_url} />
                <PostContent title={post.title} content={post.content} date={post.createdAt} />
            </Link>
        </>
    );
};

const PostListCard = ({ post }) => {
    return (
        <Link to={`/post/${post._id}`}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-1/2">
                    <PostMedia postUrl={post.post_url} />
                </div>
                <div className="w-full sm:w-1/2">
                    <PostContent title={post.title} content={post.content} date={post.createdAt} />
                </div>
            </div>
        </Link>
    );
};

export { PostCard, PostListCard };
