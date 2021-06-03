const   AppError                        = require("../errors/AppError")
const { Post, User }                    = require("../models")
const { JsonValidation, JsonOnlyAttrs } = require("../services/general")

const TodosPosts = async (req,res,next) => {
    console.log('TodosPosts')
    const posts = await Post.findAll({include:{model:User,attributes:['id','name']}})
    return res.json(posts)
}

const NovoPost = async (req,res,next) => {
    const { idUser } = req.params

    // Valida se todos o campos obrigatórios foram preenchidos
    JsonValidation(req.body,['title','content'])

     // Pega os atributos passados no corpo da requisição
     const { title, content } = req.body

     // Cria um novo post dados os atributos passados no corpo da requisição
    const newPost = await Post.create({title,content,userId:idUser})

    return res.json(newPost)
}

const TodosPostsDoUsusario = async (req,res,next) => {
    console.log('TodosPostsDoUsusario')

    const { idUser } = req.params

    // Busca todos os posts do usuário
    const posts = await Post.findAll({where:{userId:idUser},attributes:['id','title','content','createdAt','updatedAt'],include:[{model:User,attributes:['id','name']}]})

    return res.json(posts)
}

const BuscarPost = async (req,res,next) => {
    console.log('BuscarPost')
    const { idPost } = req.params

    // Busca o post pelo 'id' passado por parâmetro
    const post = await Post.findByPk(idPost,{attributes:['id','title','content','createdAt','updatedAt'],include:[{model:User,attributes:['id','name']}]})
    if(post === null )throw new AppError('No posts found for this id','400')

    return res.json(post)
}

const EditarPost = async (req,res,next) => {
    const { idPost } = req.params
    // Definição dos atributos que são permitidos alterações nessa rota
    const Attrs = ['title','content']

    // Pega do corpo da requisição apenas os atributos permitidos
    const AttrsAllowed = JsonOnlyAttrs(req.body,Attrs)

    // Busca o post pelo 'id' passado por parâmetro
    const post = await Post.findByPk(idPost)
    if(post === null )throw new AppError('No posts found for this id','400')

    // Altera os atributos do post
    Attrs.forEach((attr)=>{
        if(AttrsAllowed[attr])post[attr] = AttrsAllowed[attr]
    })

    // Salva as alterações dos atributos do post
    await post.save()
    
    return res.json(post)
}

const DeletarPost = async (req,res,next) => {
    const { idPost } = req.params

    // Busca o post pelo 'id' passado no corpo da requisição
    const post = await Post.findByPk(idPost)
    if(post === null )throw new AppError('No posts found for this id','400')

    // Deleta o post
    await post.destroy()

    return res.json({status:'OK',message:`Post '${idPost}' deletado`})
}

module.exports = { NovoPost, TodosPostsDoUsusario, BuscarPost, EditarPost, DeletarPost, TodosPosts }