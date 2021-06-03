const   AppError                                        = require('../errors/AppError');
const { User, Post }                                    = require('./../models/index')
const { hash }                                          = require('bcryptjs')
const { JsonValidation, JsonOnlyAttrs, CheckOnlyAttrs } = require('../services/general');

const NovoUsuario = async (req,res,next) => {
    // Valida se todos o campos obrigatórios foram preenchidos
    JsonValidation(req.body,['name','email','password'])

    // Pega os atributos passados no corpo da requisição
    const { name, email, password } = req.body

    // Verifica se o email passado no corpo da requisição já foi cadastrado por outro usuário ****
    await CheckOnlyAttrs(User,['email'],req.body)
    
    // Criptografa a senha passada no corpo da requisição
    const HashPassword = await hash(password,10)
    
    // Cria um novo usuário dados os atributos passados no corpo da requisição
    const newUser = await User.create({name,email,password:HashPassword})

    // Informa apenas dados não sensíveis do usuário
    const infoUser = JsonOnlyAttrs(newUser,['id','name','createdAt','updatedAt'])

    return res.json(infoUser)
}

const TodosUsuarios = async (req,res,next) => {
    
    // Busca todos os usuários
    const users = await User.findAll({attributes:['id','name'],include:{model:Post,attributes:['id','title','content']}})

    return res.json(users)
}

const BuscarUsuario = async (req,res,next) => {
    const { idUser } = req.params

    // Busca o usuário pelo 'id' passado por parâmetro
    const user = await User.findByPk(idUser,{attributes:['id','name','createdAt','updatedAt']})
    if(user === null )throw new AppError('No users found for this id','400')

    return res.json(user)
}

const EditarUsuario = async (req,res,next) => {
    const { idUser }  = req.params

    // Definição dos atributos que são permitidos alterações nessa rota
    const Attrs = ['name']

    // Pega do corpo da requisição apenas os atributos permitidos
    const AttrsAllowed = JsonOnlyAttrs(req.body,Attrs)

    // Busca o usuário pelo 'id' passado no corpo da requisição
    const user = await User.findByPk(idUser)
    if(user === null )throw new AppError('No users found for this id','400')
    
    // Altera os atributos do usuário
    Attrs.forEach((attr)=>{
        if(AttrsAllowed[attr])user[attr] = AttrsAllowed[attr]
    })

    // Salva as alterações dos atributos do usuário
    await user.save()

    // Informa apenas os dados não sensíveis do usuário
    const infoUser = JsonOnlyAttrs(user,['id','name','createdAt','updatedAt'])

    return res.json(infoUser)
}

const DeletarUsuario = async (req,res,next) => {
    const { idUser } = req.params

    // Busca o usuário pelo 'id' passado no corpo da requisição
    const user = await User.findByPk(idUser)
    if(user === null )throw new AppError('No users found for this id','400')

    // Deleta o usuário
    await user.destroy()

    return res.json({status:'OK',message:`Usuário '${idUser}' deletado`})
}

module.exports = { NovoUsuario, TodosUsuarios, BuscarUsuario, EditarUsuario, DeletarUsuario }