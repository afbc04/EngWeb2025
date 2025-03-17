var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 10)
  res.render('homePage', { titulo: 'Consultas' , cor: 'gray', data: d});
});

module.exports = router;
