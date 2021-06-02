const AppError = require("../errors/AppError")

const ExceptionHandler = (err,req,res,next) => {
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
}

module.exports = { ExceptionHandler }