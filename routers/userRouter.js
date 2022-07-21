const userRouter = require('express').Router();

userRouter.get('/', (req, res) => {
    res.send('List user')
})

userRouter.get('/add', (req, res) => {
    res.send('form add user')
})

userRouter.post('/add', (req, res) => {
    res.send('add user')
})

userRouter.get('/:id/edit', (req, res) => {
    res.send('form edit user')
})

userRouter.post('/:id/edit', (req, res) => {
    res.send('edit user')
})

userRouter.get('/:id/edit-profile', (req, res) => {
    res.send('form edit profile student')
})

userRouter.post('/:id/edit-profile', (req, res) => {
    res.send('edit profile student')
})

module.exports = userRouter;