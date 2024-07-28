import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { getInitials } from '../utils/utils';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await UserService.getAllUsers();
                setUsers(usersData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
        <div className='w-full '>
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
                        <div key={user._id} className='border overflow-auto my-2 w-full sm:w-72  rounded-xl bg-white shadow-md'>
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
