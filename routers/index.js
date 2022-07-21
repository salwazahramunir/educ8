const router = require('express').Router();
const courseRouter = require('./courseRouter');
const userRouter = require('./userRouter');
const transactionRouter = require('./transactionRouter');
const authRouter = require('./authRouter');
const HomeController = require('../controllers/HomeController');

// route home
router.get('/', HomeController.home);

router.use('/courses', courseRouter);
router.use('/users', userRouter);
router.use('/transactions', transactionRouter);
router.use('/auth', authRouter);


module.exports = router;