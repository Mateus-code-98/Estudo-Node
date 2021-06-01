const   User             = require('./../models/user')
const { compare }        = require('bcryptjs')
const { sign }           = require('jsonwebtoken');
const { JsonValidation, 
        JsonOnlyAttrs 
      } = require('../services/general')

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
            const token = sign({},'32341e3d77060d8c5bafe86d085562cb',{
                subject:user.id,
                expiresIn:'1d'
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

module.exports = { Login }