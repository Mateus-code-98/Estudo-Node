const   User      = require('./../models/user')
const { compare } = require('bcryptjs')

const Login = async (req,res,next) => {
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