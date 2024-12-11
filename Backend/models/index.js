const sequelize = require('../config/database');
const User = require('./user');
const Account = require('./account');

// Define relationships
User.hasMany(Account, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Account.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = {
    sequelize,
    User,
    Account,
};
