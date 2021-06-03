const { Router }    = require('express');
const   UsersRouter = require('./usersRoutes')
const   PostsRouter = require('./postsRouter')
const   routes      = Router()
const { Login }     = require('../controllers/authControllers');

routes.use ( '/users' , UsersRouter )
routes.use ( '/posts' , PostsRouter )
routes.post( '/login' , Login       )

module.exports = routes