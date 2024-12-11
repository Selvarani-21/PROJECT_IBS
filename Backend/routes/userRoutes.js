const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');
const Account = require('../models/account');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ status: 'success', data: users });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to fetch users' });
    }
});










// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (user) {
          res.json({ name: user.name, email: user.email }); // Ensure this structure
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user' });
  }
});


router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err });
  }
});

// Update User
// Update User
router.put('/:id', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    await user.update({ name: name || user.name, email: email || user.email, password: hashedPassword });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err });
  }
});
// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err });
  }
});

module.exports = router;
