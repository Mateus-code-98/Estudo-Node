const { Router }                                          = require('express');
const { TodosPosts, EditarPost, DeletarPost, BuscarPost } = require('../controllers/postsController');
const { VerificaId_User, VerificaId_Post }                = require('../middlewares/idValidation');

const PostsRouter = Router()

PostsRouter.get   ( '/'        , TodosPosts                    ) // LISTAR TODOS OS POSTS
PostsRouter.put   ( '/:idPost' , VerificaId_Post , EditarPost  ) // EDITAR  UM POST 
PostsRouter.delete( '/:idPost' , VerificaId_Post , DeletarPost ) // DELETAR UM POST 
PostsRouter.get   ( '/:idPost' , VerificaId_Post , BuscarPost  ) // BUSCAR  UM POST 

module.exports = PostsRouter