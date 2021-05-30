const   express      = require('express');
const   router       = express.Router()
const { SalvarUser } = require('./../controllers/usersController')

router.post('/',SalvarUser)

module.exports = router