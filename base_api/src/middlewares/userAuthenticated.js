const { verify } = require('jsonwebtoken')
const AppError = require('../errors/AppError')

const UserAuthenticated = (req,res,next) => {
    const authHeader = req.headers.authorization

    // Verifica se o token JWT foi enviado no cabeçalho da requisição
    if(!authHeader) throw new AppError('JWT token is missing','400')

    // Retira o 'Bearer' que vem antes do token JWT no atributo 'authorization' do cabeçalho da requisição
    const token = authHeader.split(' ')[1]

    //Verifica se o token JWT é válido
    try{
        const decoded = verify(token,process.env.JWT_SECRET)
        // Adiciona à requisição o atributo 'user' que contém o 'id' do usuário provedor do token JWT passado no cabeçalho da requisição
        req.user = { id:decoded.sub }
        return next()
    }catch(err){
        return res.status(400).json(err)
    }
    

}

module.exports = { UserAuthenticated }