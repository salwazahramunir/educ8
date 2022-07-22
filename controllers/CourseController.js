const { User, Course, Transaction, TransactionDetail } = require('../models')

class CourseController {

    static courseList(req, res){
        const session = {
            userId: req.session.userId,
            role: req.session.role
        }

        Course.findAll()
        .then(courses => {
            res.render('course/courseList', { courses, session });
        })
        .catch(err => {
            res.send(err);
        })
    }

    static courseAdd(req,res){
        const { errors } = req.query;
        const session = {
            userId: req.session.userId,
            role: req.session.role
        }
        res.render('course/courseAdd', { errors, session });
    }

    static courseSave(req, res){
        let {name, description, price, duration, imageUrl, category} = req.body
        Course.create({name, description, price, duration, imageUrl, category})
        .then( (newCourse) => {
            res.redirect('/courses/')
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                let errors = err.errors.map(el => el.message);
                res.redirect(`/courses/add?errors=${errors}`);
            } else {
                res.send(err)
            }
        })
    }

    static courseEdit(req, res){
        let { id } = req.params;
        const { errors } = req.query;
        const session = {
            userId: req.session.userId,
            role: req.session.role
        }

        Course.findByPk(id)
        .then(course => {
            res.render('course/courseEdit', { course, errors, session })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static courseUpdate(req, res){
        let { id } = req.params
        let {name, description, price, duration, imageUrl, category} = req.body

        Course.update(
            {name, description, price, duration, imageUrl, category},
            {where : {id}}
        )
        .then( () => {
            res.redirect('/courses')
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                let errors = err.errors.map(el => el.message);
                res.redirect(`/courses/${id}/edit?errors=${errors}`);
            } else {
                res.send(err)
            }
        })
    }

    static courseDelete(req, res) {
        const { id } = req.params;
        Course.destroy({ where: { id } })
            .then(() => {
                res.redirect('/courses');
            })
            .catch(err => {
                res.send(err);
            });
    }

    static courseBuy(req, res){
        const { id } = req.params;
        const userId = req.session.userId;
        let dataUser;
        User.findOne({
                include: {
                  model: TransactionDetail,
                  include: [ Course, {
                    model: Transaction,
                    where: {
                        status: "unpaid"
                    }
                  }]
                },
                where: {
                    id: userId
                }
              })
            .then(user => {
                dataUser = user
                
                if(user.TransactionDetails.length === 0) {
                    return Transaction.create({ totalPrice: 0, status: "unpaid"})
                } else {
                    return dataUser
                }
            })
            .then(newTransaction => {
                if(newTransaction.invoice) {
                    return TransactionDetail.create({ UserId: userId, CourseId: id, TransactionId: newTransaction.id})
                } else {
                    const TransactionId = dataUser.TransactionDetails[0].Transaction.id
                    return TransactionDetail.create({ UserId: userId, CourseId: id, TransactionId })
                }
            })
            .then(() => {
                return User.findOne({
                    include: {
                      model: TransactionDetail,
                      include: [ Course, {
                        model: Transaction,
                        where: {
                            status: "unpaid"
                        }
                      }]
                    },
                    where: {
                        id: userId
                    }
                  })
            })
            .then(finalUser => {
                let sum = 0;
                finalUser.TransactionDetails.forEach(el => {
                    sum += el.Course.price
                })
                const TransactionId = finalUser.TransactionDetails[0].Transaction.id
                return Transaction.update({ totalPrice: sum }, { where: { id: TransactionId }})
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                res.send(err);
            });
    }

}

module.exports = CourseController;