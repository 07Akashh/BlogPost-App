import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserService from '../../../services/UserService';
import Input from '../../shared/Input';
import ProfileImage from '../../shared/ProfileImage';
import SelectInput from '../../shared/SelectInput';
import TextArea from '../../shared/TextArea';
import capitalize from '../../shared/capitalize';
import CreateFormData from '../../shared/createFormData';
import InitializeFormData from '../../shared/initializeFormData';


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
            await UserService.updateProfile(CreateFormData(formData));
            onProfileUpdate?.();
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setUploading(false);
        }
    }, [formData, onProfileUpdate]);

    const handleImageClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    return (
        <div className="m-5 p-5 border border-gray-300 rounded-lg bg-gray-100 max-w-lg mx-auto relative">
            {closeButton}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <ProfileImage
                    previewImage={formData.profile_image}
                    onClick={handleImageClick}
                    fileInputRef={fileInputRef}
                    handleChange={handleChange}
                />
                {['name', 'username'].map(field => (
                    <Input
                        type='text'
                        key={field}
                        name={field}
                        value={formData[field]}
                        handleChange={handleChange}
                        placeholder={capitalize(field)}
                    />
                ))}
                <Input
                    type='email'
                    name="email"
                    value={formData.email}
                    handleChange={handleChange}
                />
                <Input
                    type='number'
                    name="phone"
                    value={formData.phone}
                    handleChange={handleChange}
                />
                <TextArea
                    name="bio"
                    value={formData.bio}
                    handleChange={handleChange}
                />
                <SelectInput
                    name="gender"
                    value={formData.gender}
                    handleChange={handleChange}
                    options={['Male', 'Female', 'Custom']}
                />
                <button type="submit" disabled={uploading} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                    Update Profile
                </button>
            </form>
            {uploading && <p>Uploading...</p>}
        </div>
    );
};

export default ProfileUpdate;
