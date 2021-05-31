const User = require('./../models/user')

const NovoUsuario = async (req,res,next) => {
    const { firstName, lastName, email } = req.body
    try{
        const resultado = await User.create({firstName,lastName,email})
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
    const { id } = req.params
    const { firstName, lastName , email } = req.body

    try{
        const resultado = await User.findByPk(id)

        resultado.firstName = firstName
        resultado.lastName  = lastName
        resultado.email     = email

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