const userRouter = require('express').Router();
const UserController = require('../controllers/UserController');

userRouter.get('/', UserController.listUser);

userRouter.get('/add', UserController.formAdd);

userRouter.post('/add', UserController.createUser);

userRouter.get('/:id/edit', UserController.formEdit);

userRouter.post('/:id/edit', UserController.updateUser);

userRouter.get('/:id/delete', UserController.deleteUser);

userRouter.get('/:id/edit-profile', (req, res) => {
    res.send('form edit profile student')
})

userRouter.post('/:id/edit-profile', (req, res) => {
    res.send('edit profile student')
})

module.exports = userRouter;