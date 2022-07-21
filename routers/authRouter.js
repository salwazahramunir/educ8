const authRouter = require('express').Router();
const AuthController = require('../controllers/AuthController');

//route register
authRouter.get('/register', AuthController.formRegister);

authRouter.post('/register', AuthController.postRegister);

//route login
authRouter.get('/login', AuthController.formLogin);

authRouter.post('/login', AuthController.postLogin);

module.exports = authRouter;