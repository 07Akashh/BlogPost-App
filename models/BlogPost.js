const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = require('./Comment'); // Import the Comment model

const BlogPostSchema = new Schema({
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post_url: { type: String },
    video_url: { type: String },
    comments: [Comment.schema]
}, {
    timestamps: true
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
