const   User             = require('./../models/user')
const { compare }        = require('bcryptjs')
const { JsonValidation } = require('../services/validations')

const Login = async (req,res,next) => {

    // Valida se todos o campos obrigatórios foram preenchidos
    const validation = JsonValidation(req.body,['email','password'])
    if(!validation.status)return res.json({message:validation.message})

    // Pega os atributos passados no corpo da requisição
    const { email, password } = req.body

    try{
        //Verifica se o email passado no corpo da requisição é de algum usuário
        const resultado = await User.findOne({where:{email}})
        if(resultado.length === 0)return res.json({message:'Error email/password incorrect!'})

        //Verifica se a senha passada no corpo da requisição é a senha do email passado também no corpo da requisição
        const cryptPassword = resultado.password
        const resu          = await compare(password,cryptPassword)
        if(resu)return res.json({message:'Logado'})
        return res.json({message:'Error email/password incorrect!'})

    }catch(err){
        return res.json(err)
    }
}

module.exports = { Login }