const router = require('express').Router();
const courseRouter = require('./courseRouter');
const userRouter = require('./userRouter');
const transactionRouter = require('./transactionRouter');
const authRouter = require('./authRouter');
const HomeController = require('../controllers/HomeController');

// route home

router.get('/', HomeController.home);
router.get('/list-course-by-user/:userId', HomeController.listCourseByUser);
router.use('/auth', authRouter);

router.use((req, res, next) => {
    if(!req.session.userId) {
        const error = "Please login first";
        res.redirect(`/auth/login?error=${error}`);
    } else {
        res.locals.user = req.session.userId;
        next();
    }
});

router.use('/courses', courseRouter);
router.use('/users', userRouter);
router.use('/transactions', transactionRouter);


module.exports = router;