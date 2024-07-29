import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';
import UserItem from './user_list/UserItem';

const UserList = () => {
    const { users, loading, error } = useUsers();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
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
                    {filteredUsers.map((user) => (
                        <UserItem key={user._id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
