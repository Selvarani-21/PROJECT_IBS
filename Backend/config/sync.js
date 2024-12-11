// sync.js

const sequelize = require('./database'); // Import sequelize instance
const User = require('../models/user');
const Account = require('../models/account');

// Sync all models (create the tables)
sequelize.sync({ force: true }) // Use { force: true } to drop and recreate the tables
    .then(() => {
        console.log('Database tables created successfully');
    })
    .catch((err) => {
        console.error('Error creating tables:', err);
    });
