const {Course} = require('../models')

class CourseController {

    static courseList(req, res){
        Course.findAll()
        .then(courses => {
            res.send(courses)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static courseAdd(req,res){
        res.render('course/courseAdd')
    }

    static courseSave(req, res){
        let {name, description, price, duration, imageUrl, category} = req.body
        Course.create({name, description, price, duration, imageUrl, category})
        .then( (newCourse) => {
            res.redirect('/courses/')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static courseEdit(req, res){
        let { id } = req.params

        Course.findByPk(id)
        .then(course => {
            res.send(course)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static courseUpdate(req, res){
        let { id } = req.params
        let {name, description, price, duration, imageUrl, category} = req.body

        Course.update(
            {name, description, price, duration, imageUrl, category},
            {where : {id}}
        )
        .then( () => {
            req.redirect('/courses')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static courseBuy(req, res){
        res.send('ini untuk beli')
    }

}

module.exports = CourseController;