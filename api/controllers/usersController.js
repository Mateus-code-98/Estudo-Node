const { User }   = require('../models/index');
const   database = require('./../database/db');

const SalvarUser = async (req,res,next) => {
        await database.sync();
        console.log(req.body.firstName)
        const resultado = await User.create({
            firstName:req.firstName,
            lastName:req.lastName,
            email:req.email
        })
        console.log(resultado)
        return resultado
}

module.exports = { SalvarUser }