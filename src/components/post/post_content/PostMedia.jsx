import React from 'react';
import { isImage, isVideo } from '../../../utils/utils';

const PostMedia = ({ postUrl }) => (
    <div className='mt-2 border-gray-300 w-full p-1 rounded-lg'>
        {postUrl && isImage(postUrl) && <img src={postUrl} alt="Post" className='h-[240px] w-full object-cover' />}
        {postUrl && isVideo(postUrl) && <video src={postUrl} controls className='h-[240px] w-full ' />}
    </div>
);
const PostDetailMedia = ({ postUrl }) => (
    <div className='mt-2 border-gray-300 w-full p-1 rounded-lg'>
        {postUrl && isImage(postUrl) && <img src={postUrl} alt="Post" className=' w-full object-cover' />}
        {postUrl && isVideo(postUrl) && <video src={postUrl} controls className=' w-full ' />}
    </div>
);

export { PostDetailMedia, PostMedia };
