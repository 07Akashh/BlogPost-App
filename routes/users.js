const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const auth = require('../middleware/auth');
const { uploadToCloudinary } = require('../middleware/upload');
const { validationResult } = require('express-validator');
const validationRules = require('../middleware/validationRules');
const router = express.Router();

router.post('/register', validationRules(), async (req, res) => {
    const { name, username, email, password, phone, gender } = req.body;
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({
            name,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
            phone,
            gender
        });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        const payload = {
            id: user.id
        };
        const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ $or: [{ email: username.toLowerCase() }, { username: username.toLowerCase() }] });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.setHeader('Authorization', 'Bearer' + token);
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/profile', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: `User not found ${req.user}` });
        }
        res.send(user);
    } catch (error) {
        res.send(error)
    }
});

router.get('/profile/:id', auth, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: `User not found ${req.user}` });
        }
        res.send(user);
    } catch (error) {
        res.send(error)
    }
});


router.patch('/profile', auth, async (req, res) => {
    const userId = req.user.id;
    const updates = req.body;
    if (req.files) {
        const image = req.files.profile_image;
        try {
            const result = await uploadToCloudinary(image);
            updates.profile_image = result;
        } catch (error) {
            return res.status(500).send({ error: 'Failed to upload image', details: error.message });
        }
    }

    if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    res.send(user);
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
