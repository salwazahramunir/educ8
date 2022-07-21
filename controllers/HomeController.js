const { Course } = require('../models');
const { Op } = require('sequelize');

class HomeController {

    static home(req, res) {
        const { search } = req.query;

        Course.findAll({
                where: {
                    name: {
                        [Op.iLike] :  search ? `%${search}%`:  "%%"
                    }
                }
            })
            .then(courses => {
                res.render('home', { courses })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listCourseByUser(req, res) {
        res.render('listCourseByUser');
    }

}

module.exports = HomeController;