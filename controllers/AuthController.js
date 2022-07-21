const { render } = require("ejs");

class AuthController {

    static formLogin(req, res) {
        res.render('auth/login');
    }

    static postLogin(req, res) {
        res.send('post login');
    }

    static formRegister(req, res) {
        res.render('auth/register');
    }

    static postRegister(req, res) {
        res.send('post register')
    }

}

module.exports = AuthController;