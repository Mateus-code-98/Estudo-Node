const   User   = require('./../models/user')
const { hash } = require('bcryptjs')
const { JsonValidation, 
        JsonScanner 
      } = require('../services/validations')

const NovoUsuario = async (req,res,next) => {

    // Valida se todos o campos obrigatórios foram preenchidos
    const validation = JsonValidation(req.body,['firstName','lastName','email','password'])
    if(!validation.status)return res.json({message:validation.message})

    // Pega os atributos passados no corpo da requisição
    const { firstName, lastName, email, password } = req.body

    // Criptografa a senha passada no corpo da requisição
    password = await hash(password,10)
    
    try{
        const resultado = await User.create({firstName,lastName,email,password})
        return res.json(resultado)
    }catch(err){
        return res.json(err)
    }
}

const TodosUsuarios = async (req,res,next) => {
    try{
        const resultado = await User.findAll()
        return res.json(resultado)
    }catch(err){
        return res.json(err)
    }
}

const BuscarUsuario = async (req,res,next) => {
    const { id } = req.params
    try{
        const resultado = await User.findByPk(id)
        return res.json(resultado)
    }catch(err){
        return res.json(err)
    }
}

const EditarUsuario = async (req,res,next) => {
    const   Attrs = JsonScanner(req.body)
    const { id }  = req.params
    try{
        const resultado = await User.findByPk(id)
        Attrs.forEach((attr)=>{
            resultado[attr] = req.body[attr]
        })
        await resultado.save()

        return res.json(resultado)
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

module.exports = { NovoUsuario, TodosUsuarios, BuscarUsuario, EditarUsuario,DeletarUsuario }