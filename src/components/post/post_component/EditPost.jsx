import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePost } from '../../../services/BlogPostService';

const EditPost = ({ postId, initialData, onEditComplete }) => {
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedData = await updatePost(postId, formData);
            onEditComplete(updatedData);
            window.location.reload();
            toast.success('Post Updated Successfully')
        } catch (err) {
            toast.error("Can't Edit Post Try After Sometime")
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label htmlFor="title" className="block">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </form>
        </>
    );
};

export default EditPost;
