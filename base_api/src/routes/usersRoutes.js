const { Router } = require('express');
const { VerificaID } = require('../middlewares/Validation');
const { NovoUsuario, TodosUsuarios, BuscarUsuario, EditarUsuario, DeletarUsuario, Login } = require('../controllers/usersController');
const { UserAuthenticated } = require('../middlewares/userAuthenticated');

const UsersRouter = Router();

UsersRouter.get   ( '/'      , TodosUsuarios              ) 
UsersRouter.post  ( '/'      , NovoUsuario                )
UsersRouter.put   ( '/:id'   , VerificaID, EditarUsuario  )
UsersRouter.delete( '/:id'   , VerificaID, DeletarUsuario )
UsersRouter.get   ( '/:id'   , VerificaID, UserAuthenticated , BuscarUsuario  )
UsersRouter.post  ( '/login' , Login                      )

module.exports = UsersRouter;