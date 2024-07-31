const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');
const auth = require('../middleware/auth');
const parser = require('../config/multer');
const { uploadToCloudinary } = require('../middleware/upload');

router.post('/add', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user.id;
        let post_url = '';
        
        if (req.files) {
            const post = req.files.media;
            post_url = await uploadToCloudinary(post);
        }
        
        const post = new BlogPost({
            title,
            content,
            author,
            post_url,
        });
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        console.error(`Error in POST /add: ${error.message}`);
        res.status(500).json({ message: 'Failed to create the blog post', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find().populate('author');
        res.send(posts);
    } catch (error) {
        console.error(`Error in GET /: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch blog posts', error: error.message });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id).populate('author');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.send(post);
    } catch (error) {
        console.error(`Error in GET /:id: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch the blog post', error: error.message });
    }
});

router.patch('/:id', auth, async (req, res) => {
    const { title, content } = req.body;

    if (title && (typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    if (content && (typeof content !== 'string' || content.trim() === '')) {
        return res.status(400).json({ error: 'Content must be a non-empty string' });
    }

    try {
        const updateData = { ...req.body };
        const post = await BlogPost.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.send(post);
    } catch (error) {
        console.error(`Error in PATCH /:id: ${error.message}`);
        res.status(500).json({ message: 'Failed to update the blog post', error: error.message });
    }
});

router.get('/author/:id', auth, async (req, res) => {
    const authorId = req.params.id;

    if (!authorId) {
        return res.status(400).json({ message: 'Author ID is required' });
    }

    try {
        const posts = await BlogPost.find({ author: authorId }).populate('author', 'name profile_image');
        res.status(200).json(posts);
    } catch (error) {
        console.error(`Error in GET /author/:id: ${error.message}`);
        res.status(500).json({ message: 'Error fetching posts by author', error: error.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.send(post);
    } catch (error) {
        console.error(`Error in DELETE /:id: ${error.message}`);
        res.status(500).json({ message: 'Failed to delete the blog post', error: error.message });
    }
});

module.exports = router;
