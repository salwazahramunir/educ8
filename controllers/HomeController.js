const { Course, TransactionDetail, Transaction } = require('../models')
const { Op } = require('sequelize');

class HomeController {

    static home(req, res) {
        const { search } = req.query;
        const session = {
            userId: req.session.userId,
            role: req.session.role
        }

        Course.findAll({
                where: {
                    name: {
                        [Op.iLike] :  search ? `%${search}%`:  "%%"
                    }
                }
            })
            .then(courses => {
                res.render('home', { courses, session })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listCourseByUser(req, res) {
        const userId = req.session.userId;
        let transactionDetails;

        const session = {
            userId: req.session.userId,
            role: req.session.role
        }

        TransactionDetail.findAll({
                where: {
                    UserId: userId
                },
                include: [ Course, {
                    model: Transaction,
                    where: {
                        status: "paid"
                    }
                }]
            })
            .then(data => {
                transactionDetails = data;
                return TransactionDetail.info(userId);
            })
            .then(info => {
                res.render('listCourseByUser', { transactionDetails, info: info, session });
            })
            .catch(err => {
                res.send(err);
            })
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if(err) res.send(send);
            else {
                res.redirect('/auth/login');
            }
        });
    }

}

module.exports = HomeController;