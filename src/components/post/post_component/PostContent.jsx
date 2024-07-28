import React from 'react';

const PostContent = ({ title, content }) => (
    <div className="mb-2">
        <div className=" text-xl font-bold">{title}</div>
        <div className="text-sm text-neutral-600">{content}</div>
    </div>
);

export default PostContent;
