const { compare }                       = require("bcryptjs")
const { sign }                          = require("jsonwebtoken")
const   AppError                        = require("../errors/AppError")
const { User }                          = require("../models")
const { JsonValidation, JsonOnlyAttrs } = require("../services/general")

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
        const infoUser = JsonOnlyAttrs(user,['id','name'])

        return res.json({user:infoUser,token})
    }
    else throw new AppError('Error email/password incorrect','400')
}

module.exports = { Login }