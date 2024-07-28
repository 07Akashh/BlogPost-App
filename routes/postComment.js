const express = require('express');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/:id/comment', auth, async (req, res) => {
    try {
        const { comment } = req.body;
        const commenterId = req.user.id;

        const commenter = await User.findById(commenterId).select('name username');
        if (!commenter) {
            return res.status(404).send({ error: 'Commenter not found' });
        }

        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        post.comments.push({
            commenter: commenterId,
            commenterName: commenter.name,
            commenterUsername: commenter.username,
            comment
        });

        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/:id/comments', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id).populate('comments.commenter', 'name username');
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        res.send(post.comments);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
