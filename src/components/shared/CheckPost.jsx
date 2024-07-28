export const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
};

export const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
};
