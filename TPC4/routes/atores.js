var express = require('express');
var router = express.Router();
const axios = require('axios')

//Get atores
router.get('/', function(req, res, next) {
  
  var d = new Date().toISOString().substring(0, 10)

  axios.get('http://localhost:3000/atores')
  .then(resp => {
    res.status(200).render("atores/listaAtores", {titulo: "Gestão de Atores", cor:"indigo", atores: resp.data, data: d})
  })
  .catch (error => {
    res.status(500).render("error", {error: error})
  })

});

//Get /atores/:id
router.get('/:id', function(req, res, next) {
  
  var nomeAtor = req.params.id;

  var d = new Date().toISOString().substring(0, 10)

  axios.get('http://localhost:3000/atores/' + nomeAtor)
  .then(resp => {
    res.status(200).render("atores/perfil", {titulo: "Ator", cor:"indigo", ator: resp.data, data: d})
  })
  .catch (error => {
    res.status(500).render("error", {error: error})
  })

});

module.exports = router;
