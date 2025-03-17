var express = require('express');
var router = express.Router();
const axios = require('axios')

//Get filmes
router.get('/', function(req, res, next) {
  
  var d = new Date().toISOString().substring(0, 10)

  axios.get('http://localhost:3000/filmes')
  .then(resp => {
    res.status(200).render("filmes/listaFilmes", {titulo: "Gestão de Filmes", cor:"indigo", filmes: resp.data, data: d})
  })
  .catch (error => {
    res.status(500).render("error", {error: error})
  })

});

//Get /filmes/:id
router.get('/:id', function(req, res, next) {
  
  var nomeFilme = req.params.id;

  var d = new Date().toISOString().substring(0, 10)

  axios.get('http://localhost:3000/filmes/' + nomeFilme)
  .then(resp => {
    res.status(200).render("filmes/perfil", {titulo: "Filme", cor:"indigo", filme: resp.data, data: d})
  })
  .catch (error => {
    res.status(500).render("error", {error: error})
  })

});

//Get /filmes/registo -- NÃO IMPLEMENTAR
//router.get('/registo', function(req, res, next) {
//
//  var d = new Date().toISOString().substring(0, 10)
//  res.status(200).render('filmes/forms', { titulo: "Adicionar Filme", cor:"teal", data: d });
//
//});

//Get /filmes/edit/:id
router.get('/edit/:id', function(req, res, next) {
  
  var nomeFilme = req.params.id;

  var d = new Date().toISOString().substring(0, 10)

  axios.get('http://localhost:3000/filmes/' + nomeFilme)
  .then(resp => {
    res.status(200).render("filmes/formsEdit", {titulo: "Editar Filme", cor:"light-blue", filme: resp.data, data: d})
  })
  .catch (error => {
    res.status(500).render("error", {error: error})
  })

});

//Get /filmes/delete/:id
router.get('/delete/:id', function(req, res, next) {
  
  var nomeFilme = req.params.id;
  var d = new Date().toISOString().substring(0, 10)

  axios.delete('http://localhost:3000/filmes/'+nomeFilme)
  .then(resp => {
    res.status(200).redirect("/filmes")
  })
  .catch (error => {
    res.status(500).render("error", {error: error})
  })

});

//Post /filmes/registo -- NÃO IMPLEMENTAR

//Post /filmes/edit/:id
router.post('/edit/:id', function(req, res, next) {
  
  var nomeFilme = req.params.id;
  var result = req.body

  var d = new Date().toISOString().substring(0, 10)

  axios.put('http://localhost:3000/filmes/'+nomeFilme,result)
  .then(resp => {
    res.status(201).redirect("/filmes")
  })
  .catch (error => {
    res.status(500).render("error", {error: error})
  })

});


module.exports = router;
