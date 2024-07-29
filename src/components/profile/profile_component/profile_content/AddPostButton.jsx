import React from 'react';
import { FaPlus } from 'react-icons/fa';
import AddPost from '../../../post/post_component/AddPost';
import Modal from '../../../shared/Modal';

const AddPostButton = ({ handleUpdatePosts }) => (
    <>
        <div className='hidden sm:block'>
            <Modal triggerButtonLabel="Add Post">
                <AddPost onPostAdded={handleUpdatePosts} />
            </Modal>
        </div>
        <div className='sm:hidden'>
            <Modal triggerButtonLabel={<FaPlus aria-label="Add Post" />}>
                <AddPost onPostAdded={handleUpdatePosts} />
            </Modal>
        </div>
    </>
);

export default AddPostButton;
