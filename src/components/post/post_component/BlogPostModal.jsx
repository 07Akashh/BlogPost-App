import React, { useState } from 'react';
import PostsList from '../PostsList';

const BlogPostModal = (  ) => {
    const [selectedPostUrl, setSelectedPostUrl] = useState(null);

    const openModal = (postId) => {
        setSelectedPostUrl(`/post/${postId}`);
    };

    const closeModal = () => {
        setSelectedPostUrl(null);
    };

    return (
        <div>
            <PostsList onPostClick={openModal} />
            {selectedPostUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl w-full border md:w-2/6 h-[735px] relative">
                        <button className="absolute top-2 right-2" onClick={closeModal}>
                            &times;
                        </button>
                        <iframe src={selectedPostUrl} title="Post Details" className="w-full  overflow-visible h-full" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPostModal;
