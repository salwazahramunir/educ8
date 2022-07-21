const transactionRouter = require('express').Router();
const TransactionController = require('../controllers/TransactionController')

transactionRouter.get('/:transactionId/transaction-detail', TransactionController.transactionShow);

module.exports = transactionRouter;