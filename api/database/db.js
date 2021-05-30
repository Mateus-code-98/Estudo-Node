const Sequelize = require('sequelize');
const config    = require('../config/database.json')

const sequelize = new Sequelize(config)

module.exports = sequelize;