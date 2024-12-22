import UserService from "../../services/UserService";

/**
 * Fetches the profile data of the current user.
 * @returns {Promise<Object>} The profile data of the user.
 */
export const fetchProfileData = async () => {
    try {
        const profileData = await UserService.getProfile();
        return profileData;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
};
