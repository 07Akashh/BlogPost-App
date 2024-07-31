import React from 'react';
import { isImage, isVideo } from '../../utils/utils';

const PostMedia = ({ postUrl }) => (
    <div className='mt-2 border-gray-300 p-1 rounded-lg'>
        {postUrl && isImage(postUrl) && <img src={postUrl} alt="Post" className='w-full self-stretch\' />}
        {postUrl && isVideo(postUrl) && <video src={postUrl} controls />}
    </div>
);

export default PostMedia;
