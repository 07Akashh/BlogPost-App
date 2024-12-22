const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const options = { resource_type: file.mimetype.startsWith('video') ? 'video' : 'image' };
        cloudinary.uploader.upload(file.tempFilePath, options, (error, result) => {
            if (error) {
                console.error('Cloudinary Upload Error:', error);
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
    });
};

module.exports = { uploadToCloudinary };
