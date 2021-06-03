const { Router }                                                                  = require('express');
const { VerificaId_User }                                                         = require('../middlewares/idValidation');
const { NovoUsuario, TodosUsuarios, BuscarUsuario, EditarUsuario, DeletarUsuario} = require('../controllers/usersController');
const { TodosPostsDoUsusario, NovoPost }                                          = require('../controllers/postsController');

const UsersRouter = Router();

UsersRouter.get   ( '/'        , TodosUsuarios                    ) // LISTAR TODOS OS USUÁRIOS
UsersRouter.post  ( '/'        , NovoUsuario                      ) // CRIAR NOVO USUÁRIO
UsersRouter.put   ( '/:idUser' , VerificaId_User , EditarUsuario  ) // EDITAR  UM USUÁRIO
UsersRouter.delete( '/:idUser' , VerificaId_User , DeletarUsuario ) // DELETAR UM USUÁRIO
UsersRouter.get   ( '/:idUser' , VerificaId_User , BuscarUsuario  ) // BUSCAR  UM USUÁRIO

UsersRouter.get   ( '/:idUser/posts'         , VerificaId_User, TodosPostsDoUsusario          ) // LISTAR TODOS OS POSTS DE UM USUÁRIO
UsersRouter.post  ( '/:idUser/posts'         , VerificaId_User, NovoPost                      ) // CRIAR NOVO POST       DE UM USUÁRIO


module.exports = UsersRouter;