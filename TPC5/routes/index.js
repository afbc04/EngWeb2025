var express = require('express');
var router = express.Router();

//Home Page
router.get('/', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  res.redirect("/alunos");
  //res.render('homePage', { titulo: 'Escola', cor: "gray", data : d });
});

module.exports = router;
