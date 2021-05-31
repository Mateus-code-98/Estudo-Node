const { Router }    = require('express');
const   UsersRouter = require('./users.routes')
const   routes      = Router()

routes.use('/users',UsersRouter)

module.exports = routes