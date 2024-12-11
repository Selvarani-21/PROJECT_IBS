// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bank_system', 'root', 'Root@12345', {
  host: '127.0.0.1', // Change if using a remote MySQL server
  dialect: 'mysql',
  port: 3306, // Make sure to specify the correct port if it's not the default
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
