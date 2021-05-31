const Sequelize = require('sequelize');
const database  = require('./../database/db')

const User = database.define('users',{
  id:{
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName:Sequelize.STRING,
  lastName:Sequelize.STRING,
  email:Sequelize.STRING,
  password:Sequelize.STRING
})

module.exports = User;