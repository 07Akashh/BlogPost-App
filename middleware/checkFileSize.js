const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

const checkFileSize = (req, res, next) => {
    const files = req.files;
    
    if (files) {
        for (const key in files) {
            if (files[key].size > MAX_SIZE) {
                return res.status(400).json({ error: `File size should not exceed ${MAX_SIZE / (1024 * 1024)} MB` });
            }
        }
    }
    
    next();
};

module.exports = checkFileSize;
