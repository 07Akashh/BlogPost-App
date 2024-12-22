import { useEffect, useState } from 'react';
import UserService from '../redux/services/UserService';

const useProfile = () => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await UserService.getProfile();
                setCurrentUserId(userData._id);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProfile();
    }, []);

    return { currentUserId, error };
};

export default useProfile;
