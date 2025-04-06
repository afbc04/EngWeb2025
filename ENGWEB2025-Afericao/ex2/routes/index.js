var express = require('express');
var router = express.Router();
const axios = require('axios');

const limite_registos = 50

// /
router.get('/', function(req, res, next) {

  res.redirect("/page/0")

});

// /page/:id
router.get('/page/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var index = Number(req.params.id)

  if (index < 0)
    index = 0

  axios.get('http://localhost:17000/books')
    .then(resp => {

      lista = resp.data
      ultimo_index = Math.ceil(lista.length/limite_registos) - 1

      if (index > ultimo_index) {
        index = ultimo_index
        res.redirect("/page/"+index)
      }
      else {

        lista = lista.slice(index*limite_registos,(index+1)*limite_registos)

        res.status(200).render("booksList", {lista: lista ,pagina : index,ant_pagina : index-1,prox_pagina : index+1,ultima_pagina : resp.data.length ,data: d, cor:"indigo", titulo:"Gestor de Livros"})
      
      }

    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});

//GET /entidades/:id
router.get('/entidades/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var id = req.params.id

  axios.get('http://localhost:17000/books/entidades/' + id)
    .then(resp => {

      var autor = resp.data
      res.status(200).render("entitiesPage", {autor: autor, data: d, cor:"red", titulo:"Ver Autor"})
          
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});

//GET /:id
router.get('/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var id = req.params.id

  axios.get('http://localhost:17000/books/' + id)
    .then(resp => {
      var livro = resp.data
      res.status(200).render("bookPage", {livro: livro,data: d, cor:"indigo", titulo:"Livro " + id})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});


module.exports = router;
