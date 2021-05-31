const   User      = require('./../models/user')
const { compare } = require('bcryptjs')

const Login = async (req,res,next) => {
    const { email, password } = req.body
    try{
        const resultado = await User.findOne({where:{email}})
        const cryptPassword = resultado.password
        const resu = await compare(password,cryptPassword)
        if(resu)return res.json({message:'Logado'})
        else return res.json({message:'Error email/password incorrect!'})
    }catch(err){
        return res.json(err)
    }
}

module.exports = { Login }