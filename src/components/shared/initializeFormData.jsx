const InitializeFormData = (user) => ({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    bio: user?.bio || '',
    profile_image: user?.profile_image || 'default-profile.png'
});

export default InitializeFormData;
