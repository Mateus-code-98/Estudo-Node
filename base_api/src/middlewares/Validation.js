const { validate } = require('uuid')

const VerificaID = (req,res,next) => {
    const { id } = req.params 
    if(validate(id))next()
    else return res.json({message:'Id inválido!'})
}

module.exports = { VerificaID }