const express = require('express');
const Account = require('../models/account');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, accountType, balance } = req.body;

    // Validate the required fields
    if (!userId || !accountType) {
        return res.status(400).json({ message: 'User ID and Account Type are required' });
    }

    try {
        // Ensure the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the account
        const account = await Account.create({
            userId,          // Associate the existing user
            account_type: accountType,
            balance: balance || 0.00,
        });

        res.status(201).json({ message: 'Account created successfully', account });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Failed to create account', error: error.message });
    }
});

module.exports = router;
