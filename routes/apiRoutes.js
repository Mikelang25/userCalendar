var db = require('../models')

module.exports = function (app) {
  // Get all examples
  app.get('/api/tasks/:id', function (req, res) {
    db.Task.findAll({
      where: { user_id: 7 },
      order: [
        ['task_day', 'ASC'],
        ['task_stime', 'ASC']
            ]
    }).then(function (dbTasks) {
      console.log(dbTasks)
      res.json(dbTasks)
    })
  })

  // Create a new example
  app.post('/api/tasks', function (req, res) {
    db.Task.create(req.body).then(function (taskExample) {
      res.json(taskExample)
    })
  })
  //post a new user
  app.post('/api/users', function (req, res) {
    db.User.create(req.body).then(function (userExample) {
      res.json(userExample)
      console.log(userExample)
      
    })
  })

  // Delete a task by id
  app.delete('/api/tasks/:id', function (req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample)
    })
  })

  app.delete('/api/tasks/deleteall/:id', function (req, res) {
    db.Task.destroy({ where: { user_id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample)
    })
  })
  
  app.put('/api/tasks/:id', function (req, res) {
    db.Task.update(
      {task_comment: req.body.task_comment,
       task_name: req.body.task_name,
       task_day: req.body.task_day
      },
      { 
        where: { id: req.params.id } 
      }).then(function (dbExample) {
      res.json(dbExample)
    })
  })
}
