const { render } = require("ejs");
const { User, Profile } = require('../models');
const bcrypt = require('bcryptjs');

class AuthController {

    static formLogin(req, res) {
        const { error } = req.query;
        console.log(req.query);
        res.render('auth/login', { error });
    }

    static postLogin(req, res) {
        const { email, password } = req.body;
        User.findOne({ where: { email }})
            .then(user => {
                if(user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password);

                    if(isValidPassword) {
                        req.session.userId = user.id;
                        req.session.role   = user.role;

                        return res.redirect('/');
                    } else {
                        const error = "Invalid password";
                        return res.redirect(`/auth/login?error=${error}`);
                    }
                } else {
                    const error = "Email is not register";
                    return res.redirect(`/auth/login?error=${error}`);
                }
            })
            .catch(err => {
                res.send(err);
            })
    }

    static formRegister(req, res) {
        res.render('auth/register');
    }

    static postRegister(req, res) {
        const { email, password } = req.body;
        User.create({ email, password, role: "student" })
            .then(newUser => {
                const { id } = newUser;
                return Profile.create({ UserId: id });
            })
            .then(() => {
                res.redirect('/auth/login');
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }
}

module.exports = AuthController;