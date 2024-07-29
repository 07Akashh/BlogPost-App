const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true, unique: true, index: true  },
    bio: { type: String },
    password: { type: String, required: true },
    profile_image: { type: String},
    gender: { type: String, required: true }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
