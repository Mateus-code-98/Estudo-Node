const { Router } = require('express');
const { Login }  = require('../controllers/authControllers');

const AuthRouter = Router();

AuthRouter.post ('/signin',Login)

module.exports = AuthRouter;