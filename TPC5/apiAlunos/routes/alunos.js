var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/aluno')

//GET Alunos
router.get('/', function(req, res, next) {
  Aluno.list()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//GET Alunos/:id
router.get('/:id', function(req, res, next) {
  Aluno.findById(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//POST Alunos
router.post('/', function(req, res, next) {
  Aluno.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//PUT Alunos/:id
router.put('/:id', function(req, res, next) {
  Aluno.update(req.params.id,req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//DELETE Alunos/:id
router.delete('/:id', function(req, res, next) {
  Aluno.delete(req.params.id,req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

module.exports = router;
