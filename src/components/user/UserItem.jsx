import React from 'react';
import { Link } from 'react-router-dom';
import { getInitials } from '../../utils/utils';

const UserItem = ({ user }) => (
    <div className='border overflow-auto my-2 w-full sm:w-72 rounded-xl bg-white shadow-md'>
        <Link to={`/user/${user._id}`} className='flex gap-3 px-3 py-1'>
            <div>
                {user.profile_image ? (
                    <img src={user.profile_image} alt="profile_image" className='m-auto h-12 w-12 rounded-full' />
                ) : (
                    <div className='m-auto h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold'>
                        {getInitials(user.name)}
                    </div>
                )}
            </div>
            <div>
                <h3>{user.name}</h3>
                <p>{user.username}</p>
            </div>
        </Link>
    </div>
);

export default UserItem;
