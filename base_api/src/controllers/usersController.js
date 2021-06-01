const   User             = require('./../models/user')
const { hash, compare }  = require('bcryptjs')
const { sign }           = require('jsonwebtoken');
const { JsonValidation, 
        JsonOnlyAttrs,
        CheckOnlyAttrs,
      } = require('../services/general')

const NovoUsuario = async (req,res,next) => {

    // Valida se todos o campos obrigatórios foram preenchidos
    const validationRequiredAttrs = JsonValidation(req.body,['firstName','lastName','email','password'])
    if(!validationRequiredAttrs.status)return res.json({message:validationRequiredAttrs.message})

    // Pega os atributos passados no corpo da requisição
    const { firstName, lastName, email, password } = req.body

    // Verifica se o email passado no corpo da requisição já foi cadastrado por outro usuário
    const validationOnlyAttr = await CheckOnlyAttrs(User,['email'],req.body)
    if(!validationOnlyAttr.status)return res.json({message:validationOnlyAttr.message})

    // Criptografa a senha passada no corpo da requisição
    const HashPassword = await hash(password,10)
    
    try{
        const newUser = await User.create({firstName,lastName,email,password:HashPassword})

        // Informa apenas dados não sensíveis do usuário
        const infoUser = JsonOnlyAttrs(newUser,['id','firstName','lastName','createdAt','updatedAt'])

        return res.json(infoUser)
    }catch(err){
        return res.json(err)
    }
}

const TodosUsuarios = async (req,res,next) => {
    try{
        // Busca todos os usuários
        const users = await User.findAll()

        // Informa apenas os dados não sensíveis dos usuários
        const infoUsers = []
        users.map((user)=>{
            infoUsers.push(JsonOnlyAttrs(user,['id','firstName','lastName','createdAt','updatedAt']))
        })

        return res.json(infoUsers)
    }catch(err){
        return res.json(err)
    }
}

const BuscarUsuario = async (req,res,next) => {
    const { id } = req.params
    try{
        // Busca o usuário pelo 'id' passado por parâmetro
        const user = await User.findByPk(id)

        // Informa apenas os dados não sensíveis do usuário
        const infoUser = JsonOnlyAttrs(user,['id','firstName','lastName','createdAt','updatedAt'])

        return res.json(infoUser)
    }catch(err){
        return res.json(err)
    }
}

const EditarUsuario = async (req,res,next) => {
    // Definição dos atributos que são permitidos alterações nessa rota
    const Attrs = ['firstName','lastName']

    // Pega do corpo da requisição apenas os atributos permitidos
    const AttrsAllowed = JsonOnlyAttrs(req.body,Attrs)

    const { id }  = req.params
    try{
        // Busca o usuário pelo 'id' passado no corpo da requisição
        const user = await User.findByPk(id)

        // Altera os atributos do usuário
        Attrs.forEach((attr)=>{
            if(AttrsAllowed[attr])user[attr] = AttrsAllowed[attr]
        })

        // Salva as alterações dos atributos do usuário
        await user.save()

        // Informa apenas os dados não sensíveis do usuário
        const infoUser = JsonOnlyAttrs(user,['id','firstName','lastName','createdAt','updatedAt'])

        return res.json(infoUser)
    }catch(err){
        return res.json(err)
    }
}

const DeletarUsuario = async (req,res,next) => {
    const { id } = req.params
    try{
        const resultado = await User.findByPk(id)

        await resultado.destroy()

        return res.json({message:`Usuário ${id} deletado!`})
    }catch(err){
        return res.json(err)
    }
}

const Login = async (req,res,next) => {

    // Valida se todos o campos obrigatórios foram preenchidos
    const validation = JsonValidation(req.body,['email','password'])
    if(!validation.status)return res.json({message:validation.message})

    // Pega os atributos passados no corpo da requisição
    const { email, password } = req.body

    try{
        //Verifica se o email passado no corpo da requisição é de algum usuário
        const user = await User.findOne({where:{email}})
        if(user === null )return res.json({message:'Error email/password incorrect!'})

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
        return res.json({message:'Error email/password incorrect!'})

    }catch(err){
        return res.json(err)
    }
}

module.exports = { NovoUsuario, TodosUsuarios, BuscarUsuario, EditarUsuario, DeletarUsuario, Login }