const { Sequelize } = require('sequelize');

// Update with your database details
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost', // or your database host
  dialect: 'mysql',  // or 'postgres', 'sqlite', 'mariadb', etc.
  port: 3306,        // default MySQL port
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close(); // Close the connection
  }
}

testConnection();
