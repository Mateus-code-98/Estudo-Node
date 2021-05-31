const { Router }    = require('express');
const   AuthRouter  = require('./auth.routes');
const   UsersRouter = require('./users.routes')
const   routes      = Router()

routes.use('/users',UsersRouter)
routes.use('/auth',AuthRouter)

module.exports = routes