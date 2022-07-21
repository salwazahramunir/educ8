const courseRouter = require('express').Router();
const CourseController = require('../controllers/CourseController')

courseRouter.get('/', CourseController.courseList)

courseRouter.get('/add', CourseController.courseAdd)

courseRouter.post('/add', CourseController.courseSave)

courseRouter.get('/:id/edit', CourseController.courseEdit)

courseRouter.post('/:id/edit', CourseController.courseUpdate)

courseRouter.get('/:id/delete', CourseController.courseDelete)

courseRouter.get('/:id/buy', CourseController.courseBuy)

module.exports = courseRouter;