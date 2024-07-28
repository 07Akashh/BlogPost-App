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
    const nameArray = name.split(' ');
    const initials = nameArray.length > 1
        ? nameArray[0][0] + nameArray[1][0]
        : nameArray[0][0];
    return initials.toUpperCase();
};
