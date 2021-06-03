const Sequelize = require('sequelize');
const database  = require('./../database/db')

const Post = database.define('posts',{
  id:{
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title:Sequelize.STRING,
  content:Sequelize.STRING,
  userId:Sequelize.UUID
})

module.exports = Post;