var express = require('express');
var router = express.Router();
const axios = require('axios')

//GET /alunos
router.get('/', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)

  axios.get('http://localhost:3000/alunos')
    .then(resp => {
      res.status(200).render("studentListPage", {slist: resp.data, tipo: 0 ,data: d, cor:"indigo", titulo:"Gestor de Alunos"})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});

//GET /alunos/registo
router.get('/registo', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  res.status(200).render('studentFormPage', { data: d,cor:"teal", titulo:"Adicionar Aluno"});

});

//GET /alunos/delete/:id
router.get('/delete/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var id = req.params.id

  axios.delete('http://localhost:3000/alunos/' + id)
    .then(() => {

      axios.get("http://localhost:3000/alunos")
        .then(resp => {
      
          res.status(200).render("studentListPage", {slist: resp.data, tipo: 3 ,aluno_id: id,data: d, cor:"indigo", titulo:"Gestor de Alunos"})
          
        })
        .catch(erro => {
            templates.criaHTTPError(res,500,d,erro)
        })
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});

//GET /alunos/edit/:id
router.get('/edit/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var id = req.params.id

  axios.get('http://localhost:3000/alunos/' + id)
    .then(resp => {

      res.status(200).render("studentFormEditPage", {aluno: resp.data, data: d, cor:"light-blue", titulo:"Editar Aluno"})
          
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});

//GET /alunos/:id
router.get('/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var id = req.params.id

  axios.get('http://localhost:3000/alunos/' + id)
    .then(resp => {
      var aluno = resp.data
      res.status(200).render("studentPage", {aluno: aluno,data: d, cor:"indigo", titulo:"Aluno " + id})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});

//POST /alunos/registo
router.post('/registo', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var result = req.body

  if (result) {

    axios.post('http://localhost:3000/alunos', result)
      .then(resp => {

        axios.get("http://localhost:3000/alunos")
          .then(resp => {
        
            var alunos = resp.data
            aluno_id = result._id
            res.status(201).render("studentListPage", {slist: resp.data, tipo: 1 ,aluno_id: aluno_id,data: d, cor:"indigo", titulo:"Gestor de Alunos"})
            
          })
          .catch(erro => {
              templates.criaHTTPError(res,500,d,erro)
          })

      })
      .catch (error => {
        res.status(500).render("error", {error: error, data: d})
      })

  }
  else {
    res.status(500).render("error", {error: "NO BODY DATA", data: d})
  }

});

//POST /alunos/edit/:id
router.post('/edit/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var result = req.body

  if (result) {

    axios.put('http://localhost:3000/alunos/' + result._id, result)
      .then(resp => {

        axios.get("http://localhost:3000/alunos")
          .then(resp => {
        
            var alunos = resp.data
            aluno_id = result._id
            res.status(201).render("studentListPage", {slist: resp.data, tipo: 2 ,aluno_id: aluno_id,data: d, cor:"indigo", titulo:"Gestor de Alunos"})
            
          })
          .catch(erro => {
              templates.criaHTTPError(res,500,d,erro)
          })

      })
      .catch (error => {
        res.status(500).render("error", {error: error, data: d})
      })

  }
  else {
    res.status(500).render("error", {error: "NO BODY DATA", data: d})
  }

});

module.exports = router;
