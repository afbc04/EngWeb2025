var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contrato')

//GET /contratos
router.get('/', function(req, res, next) {

  //Com query string
  if (req.query.entidade && req.query.tipo) {

    Contrato.getAllContractsFilterByEntidadeAndTipo(req.query.entidade,req.query.tipo)
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(404).jsonp(error))

  }
  else if (req.query.entidade) {

    Contrato.getAllContractsFilterByEntidade(req.query.entidade)
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(404).jsonp(error))

  }
  else if (req.query.tipo) {

    Contrato.getAllContractsFilterByTipo(req.query.tipo)
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(404).jsonp(error))

  } else {
    Contrato.getAllContracts()
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(404).jsonp(error))
  }


});

//GET /contratos/tipos
router.get('/tipos', function(req, res, next) {
  Contrato.getTipos()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//GET /contratos/entidades
router.get('/entidades', function(req, res, next) {
  Contrato.getEntidades()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//GET /contratos/entidades/:id
router.get('/entidades/:id', function(req, res, next) {
  Contrato.getEntidadesID(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//GET /contratos/:id
router.get('/:id', function(req, res, next) {
  Contrato.getContractByID(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});


//POST /contratos/:id
router.post('/', function(req, res, next) {
  Contrato.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//PUT contratos/:id
router.put('/:id', function(req, res, next) {
  Contrato.update(req.params.id,req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

//DELETE contratos/:id
router.delete('/:id', function(req, res, next) {
  Contrato.delete(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

module.exports = router;
