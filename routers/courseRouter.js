const courseRouter = require('express').Router();
const CourseController = require('../controllers/CourseController')

courseRouter.get('/:id/buy', CourseController.courseBuy)

courseRouter.use((req, res, next) => {
    if(req.session.role !== "admin"){
        const error = "You have no access";
        res.redirect(`/auth/login?error=${error}`);
    } else {
        next();
    }
});

courseRouter.get('/', CourseController.courseList)

courseRouter.get('/add', CourseController.courseAdd)

courseRouter.post('/add', CourseController.courseSave)

courseRouter.get('/:id/edit', CourseController.courseEdit)

courseRouter.post('/:id/edit', CourseController.courseUpdate)

courseRouter.get('/:id/delete', CourseController.courseDelete)


module.exports = courseRouter;