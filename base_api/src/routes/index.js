const { Router }    = require('express');
const   UsersRouter = require('./usersRoutes')
const   routes      = Router()

routes.use('/users',UsersRouter)

module.exports = routes