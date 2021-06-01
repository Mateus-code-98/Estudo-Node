const { Router }    = require('express');
const   AuthRouter  = require('./authRoutes');
const   UsersRouter = require('./usersRoutes')
const   routes      = Router()

routes.use('/users',UsersRouter)
routes.use('/auth',AuthRouter)

module.exports = routes