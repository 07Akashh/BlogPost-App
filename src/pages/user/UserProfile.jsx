import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../components/profile/Profile';
import UserService from '../../redux/services/UserService';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await UserService.getUserById(userId);
                setUser(userData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="user-profile">
            <Profile user={user} />
        </div>
    );
};

export default UserProfile;
