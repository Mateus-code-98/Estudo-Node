const { Router } = require('express');
const { VerificaID } = require('../middlewares');
const { NovoUsuario, TodosUsuarios, BuscarUsuario, EditarUsuario, DeletarUsuario } = require('./../controllers/usersController')

const UsersRouter = Router();

UsersRouter.get   ( '/'    , TodosUsuarios              ) 
UsersRouter.post  ( '/'    , NovoUsuario                )
UsersRouter.put   ( '/:id' , VerificaID, EditarUsuario  )
UsersRouter.delete( '/:id' , VerificaID, DeletarUsuario )
UsersRouter.get   ( '/:id' , VerificaID, BuscarUsuario  )

module.exports = UsersRouter;