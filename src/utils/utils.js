import moment from 'moment';

export const getTimeSinceCreation = (createdAt) => {
    const now = moment();
    const postTime = moment(createdAt);
    const duration = moment.duration(now.diff(postTime));

    const hours = duration.asHours();
    if (hours >= 24) {
        const days = Math.floor(duration.asDays());
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (hours >= 1) {
        const roundedHours = Math.floor(hours);
        return `${roundedHours} hour${roundedHours !== 1 ? 's' : ''} ago`;
    } else {
        const minutes = duration.asMinutes();
        if (minutes >= 1) {
            const roundedMinutes = Math.floor(minutes);
            return `${roundedMinutes} minute${roundedMinutes !== 1 ? 's' : ''} ago`;
        } else {
            const seconds = Math.floor(duration.asSeconds());
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
    }
};

export const getInitials = (name) => {
    if (!name) return '';
    const filteredName = name.replace(/[^a-zA-Z\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const nameArray = filteredName.split(' ').filter(Boolean);
    if (nameArray.length === 0) return name.charAt(0) + name.charAt(1);
    const initials = nameArray.length > 1
        ? nameArray[0][0] + nameArray[1][0]
        : nameArray[0][0];

    return initials.toUpperCase();
};

export const createFormData = (formData) => {
    const data = new FormData();
    for (const key in formData) {
        if (formData[key]) {
            data.append(key, formData[key]);
        }
    }
    return data;
};

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const InitializeFormData = (user) => ({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    bio: user?.bio || '',
    profile_image: user?.profile_image || 'default-profile.png'
});

export const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
};

export const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


export const validateForm = (formData) => {
    const errors = {};

    if (!formData.name) errors.name = "Name is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email address is invalid";
    }
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }
    if (!formData.phone || formData.phone === '+91') errors.phone = "Phone number is required";
    if (!formData.gender) errors.gender = "Gender is required";

    return errors;
};

export const parseErrorArray = (errorArray) => {
    const errors = {};
    errorArray.forEach((err) => {
        const { path, msg } = err;
        if (!errors[path]) {
            errors[path] = [];
        }
        errors[path].push(msg);
    });
    return errors;
};
