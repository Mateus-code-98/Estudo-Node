const { validate } = require('uuid')
const AppError = require('../errors/AppError')

const VerificaID = (req,res,next) => {
    const { id } = req.params 

    if(validate(id))return next()

    throw new AppError('Invalid Id','400')
}

module.exports = { VerificaID }