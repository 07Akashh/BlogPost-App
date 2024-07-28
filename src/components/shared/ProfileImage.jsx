import React from 'react';

const ProfileImage = ({ previewImage, onClick, fileInputRef, handleChange }) => (
    <div className="flex justify-center items-center mb-4 cursor-pointer" onClick={onClick}>
        <img
            src={previewImage instanceof File ? URL.createObjectURL(previewImage) : previewImage}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-2 border-blue-500"
        />
        <input
            type="file"
            name="profile_image"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
        />
    </div>
);

export default ProfileImage;
