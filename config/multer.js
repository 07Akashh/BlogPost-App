const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary'); // Ensure this path is correct

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog_posts',
        allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'avi', 'mov']
    }
});

const parser = multer({ storage: storage });

module.exports = parser;
