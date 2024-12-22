import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserItem from './UserItem';
import { fetchAllUsers } from '../../redux/slices/userSlice';

const UserList = () => {
    const dispatch = useDispatch();

    const { users, isLoading, error } = useSelector((state) => state.user);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchAllUsers());
        document.title = 'BlogPost';
    }, [dispatch]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users?.filter((user) =>
        user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-full'>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by username"
                className="w-full sm:w-72 p-2 mb-2 border rounded sticky"
            />
            <div className="user-list w-full sm:w-72 overflow-auto h-screen no-scrollbar">
                <div className='h-4/3 overflow-auto no-scrollbar mb-28 sm:mb-24'>
                    {filteredUsers?.map((user) => (
                        <UserItem key={user._id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
