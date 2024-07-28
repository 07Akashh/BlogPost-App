const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    commenter: {
        type: Schema.Types.ObjectId,
        required: true
    },
    commenterName: {
        type: String,
        required: true
    },
    commenterUsername: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);
