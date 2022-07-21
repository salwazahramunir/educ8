const { User, Course, Transaction, TransactionDetail } = require('../models')
const { formatRupiah } = require('../Helper/formatter');

class TransactionController {

    static transactionShow(req, res) {
        const userId = req.session.userId;
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
            .then(users => {
                let sum = 0;
                users.TransactionDetails.forEach(el => {
                    sum += el.Course.price
                })
                res.render('transaction/transactionCart', { users, formatRupiah, sum });
            })
            .catch(err => {
                res.send(err)
            });
    }

    static courseDelete(req, res) {
        const { transactionDetailId } = req.params;
        const userId = req.session.userId;
        let userData;

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
                userData = user;
                
                if(user.TransactionDetails.length > 1) {
                    return TransactionDetail.destroy({ where: { id: transactionDetailId, UserId: userId }})
                } else if(user.TransactionDetails.length === 1){
                    const id = userData.TransactionDetails[0].Transaction.id
                    return Transaction.destroy({ where: { id }})
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
                if(finalUser.TransactionDetails.length) {
                    let sum = 0;
                    finalUser.TransactionDetails.forEach(el => {
                        sum += el.Course.price
                    })
                    const TransactionId = finalUser.TransactionDetails[0].Transaction.id
                    return Transaction.update({ totalPrice: sum }, { where: { id: TransactionId }})
                } else {
                    return finalUser;
                }
            })
            .then(() => {
                res.redirect(`/transactions/${userId}/transaction-detail`);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }

    static checkout(req, res) {
        const userId = req.session.userId;
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
                const TransactionId = user.TransactionDetails[0].Transaction.id
                return Transaction.update({ status: "paid" }, { where: { id: TransactionId }})
            })
            .then(() => {
                res.redirect(`/list-course-by-user/${ userId }`);
            })
            .catch(err => {
                res.send(err);
            });
    }

}

module.exports = TransactionController;