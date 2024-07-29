const { body } = require('express-validator');
const { User } = require('../models');

const validationRules = () => [
    body('name').notEmpty().withMessage('Name is required'),
    body('username')
    .notEmpty().withMessage('Username is required')
    .matches(/^[a-zA-Z0-9._]+$/).withMessage('Only _ and . special characters are allowed'),
    body('email')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (user) {
                throw new Error('Email is already in use');
            }
        }),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character'),
    body('phone')
        .isLength({ min: 12, max: 12 }).withMessage('Phone number must be exactly 10 digits')
        .isNumeric().withMessage('Phone number must contain only digits')
            .custom(async (email) => {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (user) {
                throw new Error('Phone number is already in use');
            }
        }),
    body('gender').notEmpty().withMessage('Gender is required'),
];

module.exports = validationRules;
