const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Account = sequelize.define('Account', {
    account_type: {
        type: DataTypes.ENUM('savings', 'checking'),
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ensure userId is always required
        references: {
            model: User,
            key: 'id',
        },
    },
});

Account.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = Account;
