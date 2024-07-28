const express = require('express');
const router = express.Router();
const userRoutes = require('./users')
const postRoutes = require('./posts');
const commentRoute = require('./postComment')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/posts', commentRoute);

module.exports = router;
