const transactionRouter = require('express').Router();
const TransactionController = require('../controllers/TransactionController')

transactionRouter.get('/transaction-detail', TransactionController.transactionShow);

transactionRouter.get('/:transactionDetailId/delete', TransactionController.courseDelete);

transactionRouter.get('/:userId/checkout', TransactionController.checkout);

module.exports = transactionRouter;