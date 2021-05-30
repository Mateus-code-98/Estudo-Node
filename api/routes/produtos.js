const express = require('express');
const router = express.Router()

router.get('/',(req,res,next) => {
    return res.status(200).send(
        [
            {
                id:'a5as54asd654',
                nome:"Sapato"
            },
            {
                id:'sdf54fds4f8sf',
                nome:"Tênis"
            }
        ]
    )
})

module.exports = router