import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '../../redux/services/UserService';
import { ProfileUpdateForm } from '../shared/ProfileUpdateForm';
import { createFormData, InitializeFormData } from '../../utils/utils';

const ProfileUpdate = ({ user, onProfileUpdate, closeButton }) => {
    const [formData, setFormData] = useState(() => InitializeFormData(user));
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setFormData(InitializeFormData(user));
    }, [user]);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'profile_image' && files.length > 0 ? files[0] : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            await UserService.updateProfile(createFormData(formData));
            onProfileUpdate?.();
            closeButton?.();
            console.log('object')
            setTimeout(() => {
                setUploading(false)
            toast.success('Profile updated successfully')
            }, 1000);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        } finally {
            setUploading(false);
        }
    }, [formData, onProfileUpdate, closeButton]);

    const handleImageClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    return (
        <>
        <ToastContainer />
            <div className="m-5 p-5 border border-gray-300 rounded-lg bg-gray-100 max-w-lg mx-auto relative">
                {closeButton}
                <ProfileUpdateForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    uploading={uploading}
                    handleImageClick={handleImageClick}
                    fileInputRef={fileInputRef}
                />
            </div>
        </>
    );
};



export default ProfileUpdate;
