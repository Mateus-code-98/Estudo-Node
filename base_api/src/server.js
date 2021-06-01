require('dotenv/config')
const express = require('express');
require('express-async-errors')

const port    = process.env.PORT || 3333;
const app     = express()
const routes  = require('./routes/index')
const AppError = require('./errors/AppError')

app.use(express.json())

app.use(routes)

app.use((err,req,res,next)=>{
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status:'error',
            message:err.message
        })
    }
    console.log(err)
    return res.status(500).json({
        status:'error',
        message:'Internal server error!'
    })
})

app.listen(port,() => console.log(`Listening on port ${port} ...`))