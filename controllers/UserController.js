const { User, Profile } = require('../models');

class UserController {

    static listUser(req, res) {
        const session = {
            userId: req.session.userId,
            role: req.session.role
        }

        User.findAll({
                include: Profile
            })
            .then(users => {
                res.render('user/userList', { users, session });
            })
            .catch(err => {
                res.send(err);
            });
    }

    static formAdd(req, res) {
        const session = {
            userId: req.session.userId,
            role: req.session.role
        }

        res.render('user/userAdd', { session });
    }

    static createUser(req, res) {
        const { email, password, name, dateOfBirth, role, gender } = req.body;
        User.create({ email, password, role })
            .then(newUser => {
                const { id } = newUser;
                return Profile.create({ name, dateOfBirth, gender, UserId: id });
            })
            .then(() => {
                res.redirect('/users');
            })
            .catch(err => {
                res.send(err);
            });
    }

    static formEdit(req, res) {
        const { id } = req.params;
        const session = {
            userId: req.session.userId,
            role: req.session.role
        }

        User.findByPk(+id, {
                include: Profile
            })
            .then(user => {
                res.render('user/userEdit', { user, session });
            })
            .catch(err => {
                res.send(err);
            });
    }

    static updateUser(req, res) {
        const { id } = req.params;
        const { email, password, name, dateOfBirth, role, gender } = req.body;
        User.findByPk(+id)
            .then(user => {
                if(password === ' '){
                    password = user.password;
                }

                return User.update({ email, password, role }, { where: { id } });
            })
            .then(() => {
                return Profile.update({ name, dateOfBirth, gender, UserId: id }, { where: { UserId: id }});
            })
            .then(() => {
                res.redirect('/users');
            })
            .catch(err => {
                res.send(err);
            });
    }

    static deleteUser(req, res) {
        const { id } = req.params;
        User.destroy({ where: { id } })
            .then(() => {
                res.redirect('/users');
            })
            .catch(err => {
                res.send(err);
            });
    }

    
}

module.exports = UserController;