const express  = require('express')
const app      = express()
const produtos = require('./routes/produtos')
const users    = require('./routes/users')
const auth     = require('./middlewares/auth')

app.use('/produtos',auth)

app.use('/produtos',produtos)

app.use('/users',users)

app.get('/home',(req,res,next) => {
    return res.status(200).send({message:"Tela Inicial"})
})

module.exports = app;