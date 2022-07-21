const router = require('express').Router();
const courseRouter = require('./courseRouter');
const userRouter = require('./userRouter');
const transactionRouter = require('./transactionRouter');

// route home
router.get('/', (req, res) => {
    res.render('home')
})

//route register
router.get('/register', (req, res) => {
    res.send('form register')
})

router.post('/register', (req, res) => {
    res.send('post register')
})

//route login
router.get('/login', (req, res) => {
    res.send('form login')
})

router.post('/login', (req, res) => {
    res.send('post login')
})

router.use('/courses', courseRouter);
router.use('/users', userRouter);
router.use('/transactions', userRouter);

module.exports = router;