const   User             = require('./../models/user')
const   AppError         = require('../errors/AppError');
const { hash, compare }  = require('bcryptjs')
const { sign }           = require('jsonwebtoken');
const { JsonValidation, 
        JsonOnlyAttrs,
        CheckOnlyAttrs
      } = require('../services/general');

const NovoUsuario = async (req,res,next) => {
    // Valida se todos o campos obrigatórios foram preenchidos
    JsonValidation(req.body,['firstName','lastName','email','password'])

    // Pega os atributos passados no corpo da requisição
    const { firstName, lastName, email, password } = req.body

    // Verifica se o email passado no corpo da requisição já foi cadastrado por outro usuário ****
    await CheckOnlyAttrs(User,['email'],req.body)
    
    // Criptografa a senha passada no corpo da requisição
    const HashPassword = await hash(password,10)
    
    // Cria um novo usuário dados os atributos passados no corpo da requisição
    const newUser = await User.create({firstName,lastName,email,password:HashPassword})

    // Informa apenas dados não sensíveis do usuário
    const infoUser = JsonOnlyAttrs(newUser,['id','firstName','lastName','createdAt','updatedAt'])

    return res.json(infoUser)
}

const TodosUsuarios = async (req,res,next) => {
    
    // Busca todos os usuários
    const users = await User.findAll()

    // Informa apenas os dados não sensíveis dos usuários
    const infoUsers = []
    users.map((user)=>{
        infoUsers.push(JsonOnlyAttrs(user,['id','firstName','lastName','createdAt','updatedAt']))
    })

    return res.json(infoUsers)
}

const BuscarUsuario = async (req,res,next) => {
    const { id } = req.params

    // Busca o usuário pelo 'id' passado por parâmetro
    const user = await User.findByPk(id)
    if(user === null )throw new AppError('No users found for this id','400')
    
    // Informa apenas os dados não sensíveis do usuário
    const infoUser = JsonOnlyAttrs(user,['id','firstName','lastName','createdAt','updatedAt'])

    return res.json(infoUser)
}

const EditarUsuario = async (req,res,next) => {
    const { id }  = req.params

    // Definição dos atributos que são permitidos alterações nessa rota
    const Attrs = ['firstName','lastName']

    // Pega do corpo da requisição apenas os atributos permitidos
    const AttrsAllowed = JsonOnlyAttrs(req.body,Attrs)

    // Busca o usuário pelo 'id' passado no corpo da requisição
    const user = await User.findByPk(id)
    if(user === null )throw new AppError('No users found for this id','400')
    
    // Altera os atributos do usuário
    Attrs.forEach((attr)=>{
        if(AttrsAllowed[attr])user[attr] = AttrsAllowed[attr]
    })

    // Salva as alterações dos atributos do usuário
    await user.save()

    // Informa apenas os dados não sensíveis do usuário
    const infoUser = JsonOnlyAttrs(user,['id','firstName','lastName','createdAt','updatedAt'])

    return res.json(infoUser)
}

const DeletarUsuario = async (req,res,next) => {
    const { id } = req.params

    // Busca o usuário pelo 'id' passado no corpo da requisição
    const resultado = await User.findByPk(id)
    if(user === null )throw new AppError('No users found for this id','400')

    // Deleta o usuário
    await resultado.destroy()

    return res.json({status:'OK',message:`Usuário '${id}' deletado`})
}

const Login = async (req,res,next) => {

    // Valida se todos o campos obrigatórios foram preenchidos
    JsonValidation(req.body,['email','password'])

    // Pega os atributos passados no corpo da requisição
    const { email, password } = req.body

    //Verifica se o email passado no corpo da requisição é de algum usuário
    const user = await User.findOne({where:{email}})
    if(user === null )throw new AppError('Error email/password incorrect','400')

    //Verifica se a senha passada no corpo da requisição é a senha do email passado também no corpo da requisição
    const cryptPassword = user.password
    const resu          = await compare(password,cryptPassword)
    if(resu)
    {
        // Gera token de acesso ao usuário logado
        const token = sign({},process.env.JWT_SECRET,{
            subject:user.id,
            expiresIn:process.env.JWT_EXPIRESIN
        })

        // Informa apenas dados não sensíveis do usuário
        const infoUser = JsonOnlyAttrs(user,['id','firstName','lastName'])

        return res.json({user:infoUser,token})
    }
    else throw new AppError('Error email/password incorrect','400')
}

module.exports = { NovoUsuario, TodosUsuarios, BuscarUsuario, EditarUsuario, DeletarUsuario, Login }