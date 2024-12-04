const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Sample user data (in-memory for simplicity)
let users = [];

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// CRUD routes for user accounts

// Create (Register a new user)
app.post('/create', (req, res) => {
  const { userID, username, password, balance } = req.body;
  const newUser = { id: Date.now(), username, password, balance: parseFloat(balance) || 0 };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Read (Get user details by ID)
app.get('/user/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update (Edit user details)
app.put('/update/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    const { username, password, balance } = req.body;
    user.username = username || user.username;
    user.password = password || user.password;
    user.balance = balance !== undefined ? parseFloat(balance) : user.balance;
    res.json({ message: 'User updated successfully', user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete (Delete user)
app.delete('/delete/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


