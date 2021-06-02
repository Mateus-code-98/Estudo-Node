const { Router }            = require('express');
const { VerificaID }        = require('../middlewares/idValidation');
const { UserAuthenticated } = require('../middlewares/userAuthenticated');
const { NovoUsuario, 
        TodosUsuarios,
        BuscarUsuario, 
        EditarUsuario, 
        DeletarUsuario, 
        Login 
      } = require('../controllers/usersController');

const UsersRouter = Router();

UsersRouter.get   ( '/'      , TodosUsuarios              ) 
UsersRouter.post  ( '/'      , NovoUsuario                )
UsersRouter.put   ( '/:id'   , VerificaID, EditarUsuario  )
UsersRouter.delete( '/:id'   , VerificaID, DeletarUsuario )
UsersRouter.get   ( '/:id'   , VerificaID, UserAuthenticated , BuscarUsuario  )
UsersRouter.post  ( '/login' , Login                      )

module.exports = UsersRouter;