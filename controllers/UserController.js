const { User } = require('../models');

class UserController {

    static listUser(req, res) {
        User.findAll()
            .then(users => {
                res.send(users);
            })
            .catch(err => {
                res.send(err);
            });
    }

}

module.exports = UserController;