const express = require('express');
const path = require('path');
const sequelize = require('./config/database');  // Sequelize instance for DB connection
const userRoutes = require('./routes/userRoutes');  // Routes for user operations
const accountRoutes = require('./routes/accountRoutes'); // Routes for account operations
const cors = require('cors');

// Initialize the app
const app = express();

// CORS middleware (to allow cross-origin requests from frontend)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes for user operations (create, get, update, delete)
app.use('/users', userRoutes);

// API Routes for account operations (create, get, update, delete)
app.use('/accounts', accountRoutes);

// Serve Frontend HTML for root route (optional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Sync the database and start the server
sequelize.sync()
    .then(() => {
        app.listen(5000, () => {  // Use port 5000 for backend API
            console.log('Backend server is running on http://localhost:5000');
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });
