const express = require('express');
const router = express.Router()

router.get('/',(req,res,next) => {
    console.log('Autorizado')
    return next()
})

module.exports = router