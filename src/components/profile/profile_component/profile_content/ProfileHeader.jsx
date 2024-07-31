import React from 'react';
import Modal from '../../../shared/Modal';
import ProfileUpdate from './ProfileUpdate';

const ProfileHeader = ({ user, shouldShowModal, handleProfileUpdate, getInitials }) => (
    
    <div className='sm:flex px-3 mt-3 sm:justify-between'>
        {user.profile_image ? (
                <img src={user.profile_image} alt="profile_image" className="sm:mx-auto mb-3 sm:mb-0 h-20 w-20 sm:h-36 sm:w-36 rounded-full ring-2 ring-white" />
        ) : (
            <div className='sm:m-auto mb-3 sm:mb-0 h-20 w-20 sm:h-36 sm:w-36 rounded-full bg-gray-400 flex items-center justify-center text-white text-3xl sm:text-7xl font-semibold'>
                {getInitials(user.name)}
            </div>
        )}
        
        <div className='w-full sm:w-2/3'>
            <div className='flex gap-6'>
                <h1 className='font-semibold font-mono text-2xl'>{user.username}</h1>
            </div>
            <p className='font-semibold py-1'>{user.name}</p>
            <p className='w-full'>{user.bio}</p>
            <div className='flex justify-start gap-5 mt-5 z-10'>
            <a href={`mailto:${user.email}`} className="bg-gray-300 p-1 px-2 rounded-md text-md font-semibold text-gray-800">Email</a>
            <a href={`tel:${user.phone}`} className="bg-gray-300 p-1 px-2 rounded-md text-md font-semibold text-gray-800">Phone</a>
            {shouldShowModal &&
                    <Modal triggerButtonLabel="Edit Profile">
                        <ProfileUpdate user={user} onProfileUpdate={handleProfileUpdate} />
                    </Modal>}
            </div>
        </div>
    </div>
);

export default ProfileHeader;
