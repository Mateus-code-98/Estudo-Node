const { validate } = require('uuid')
const   AppError   = require('../errors/AppError')

const VerificaId_User = (req,res,next) => {
    const { idUser } = req.params 

    if(validate(idUser))return next()

    throw new AppError('Invalid user Id','400')
}

const VerificaId_Post = (req,res,next) => {
    const { idPost } = req.params 

    if(validate(idPost))return next()

    throw new AppError('Invalid post Id','400')
}
module.exports = { VerificaId_User, VerificaId_Post }