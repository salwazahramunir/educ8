const courseRouter = require('express').Router();

courseRouter.get('/', (req, res) => {
    res.send('List course')
})

courseRouter.get('/add', (req, res) => {
    res.send('form add course')
})

courseRouter.post('/add', (req, res) => {
    res.send('add course')
})

courseRouter.get('/:id/edit', (req, res) => {
    res.send('form edit course')
})

courseRouter.post('/:id/edit', (req, res) => {
    res.send('edit course')
})

courseRouter.get('/:id/buy', (req, res) => {
    res.send('buy course')
})

module.exports = courseRouter;