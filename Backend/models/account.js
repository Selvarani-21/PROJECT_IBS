// models/account.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Assuming the User model is already defined

const Account = sequelize.define('Account', {
    account_type: {
        type: DataTypes.ENUM('savings', 'checking'),
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00,
    },
});

// Define a relationship: Each account belongs to a user
Account.belongsTo(User);

module.exports = Account;
