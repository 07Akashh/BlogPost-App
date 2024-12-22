import React, { useCallback, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPost } from '../../../redux/services/BlogPostService';
import { createFormData } from '../../../utils/utils';
import Input from '../../shared/Input';
import MediaInput from '../../shared/MediaInput';
import Textarea from '../../shared/TextArea';

const AddPost = ({ onPostAdded, closeButton }) => {
    const [formData, setFormData] = useState(initializeFormData());
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'media' && files.length > 0 ? files[0] : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            const formDataObject = createFormData(formData);
            await createPost(formDataObject);
            setFormData(initializeFormData());
            toast.success('Post added successfully!');
            setTimeout(() => {
                onPostAdded?.();
                window.location.reload()
            }, 1000);
        } catch (error) {
            toast.error('Failed to add post.');
            console.error('Error adding post:', error);
        } finally {
            setUploading(false);
        }
    }, [formData, onPostAdded]);

    const handleMediaClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-100 border border-gray-300 p-5 rounded-lg shadow w-full max-w-lg mx-auto">
                {closeButton}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                    <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        handleChange={handleChange}
                        placeholder="Title"
                    />
                    <Textarea
                        name="content"
                        value={formData.content}
                        handleChange={handleChange}
                        placeholder="Content"
                    />
                    <MediaInput
                        previewMedia={formData.media}
                        onClick={handleMediaClick}
                        fileInputRef={fileInputRef}
                        handleChange={handleChange}
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className={`py-2 rounded text-white ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-black/80"
                            }`}
                    >
                        {uploading ? "Uploading..." : "Add Post"}
                    </button>
                </form>
            </div>
        </>
    );
};

const initializeFormData = () => ({
    title: '',
    content: '',
    media: ''
});

export default AddPost;
