import React from 'react';
import Modal from '../../shared/Modal';
import AddPost from '../../post/AddPost';
import { FaPlus } from 'react-icons/fa';

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
