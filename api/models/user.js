const Sequelize = require('sequelize');
const database  = require('./../database/db');

const User = database.define('users',{
  firstName:Sequelize.STRING,
  lastName:Sequelize.STRING,
  email:Sequelize.STRING
})

module.exports = User