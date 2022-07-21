const { User, Course, Transaction, TransactionDetail } = require('../models')

class CourseController {

    static courseList(req, res){
        Course.findAll()
        .then(courses => {
            res.render('course/courseList', { courses });
        })
        .catch(err => {
            res.send(err);
        })
    }

    static courseAdd(req,res){
        const { errors } = req.query;
        res.render('course/courseAdd', { errors });
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

        Course.findByPk(id)
        .then(course => {
            res.render('course/courseEdit', { course, errors })
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
        let dataUser;
        User.findOne({
                include: {
                  model: TransactionDetail,
                  include: [ Course, Transaction ]
                },
                where: {
                    id: 3
                }
              })
            .then(user => {
                dataUser = user
                
                if(user.TransactionDetails.length === 0) {
                    return Transaction.create({ invoice: "INV-002", totalPrice: 0, status: "unpaid"})
                } else {
                    return dataUser
                }
            })
            .then(newTransaction => {
                if(newTransaction.invoice) {
                    return TransactionDetail.create({ UserId: 3, CourseId: id, TransactionId: newTransaction.id})
                } else {
                    const TransactionId = dataUser.TransactionDetails[0].Transaction.id
                    return TransactionDetail.create({ UserId: 2, CourseId: id, TransactionId })
                }
            })
            .then(() => {
                return User.findOne({
                    include: {
                      model: TransactionDetail,
                      include: [ Course, Transaction ]
                    },
                    where: {
                        id: 3
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
                res.redirect('/home');
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }

}

module.exports = CourseController;