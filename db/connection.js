const { Sequelize } = require('sequelize');

const connection = new Sequelize(
  'auth_example_db',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = connection;