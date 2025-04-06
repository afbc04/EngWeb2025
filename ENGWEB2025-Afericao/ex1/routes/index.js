var express = require('express');
var router = express.Router();
var Livro = require('../controllers/livros');
var Autor = require('../controllers/autores');


// GET /books
router.get('/', function(req, res) {

  // GET /books?charater=EEE
  if (req.query.character) {
    Livro.getAllBooksFilterByCharacter(req.query.character)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  } 

  // GET /books?charater=EEE
  else if (req.query.genre) {
    Livro.getAllBooksFilterByGenre(req.query.genre)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  }
  
  // GET /books
  else {
    Livro.getAllBooks()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  }

});

// GET /books/genres
router.get('/genres', function(req, res) {
  Livro.getGenres()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
});

// GET /books/characters
router.get('/characters', function(req, res) {
  Livro.getCharacters()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
});

// GET /books/entidades/:idAutor
router.get('/entidades/:idAutor', function(req, res, next) {
  Autor.getAuthorByID(req.params.idAutor)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

// GET /books/:id
router.get('/:id', function(req, res, next) {
  Livro.getBookByID(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

// POST /books
router.post('/', function(req, res, next) {
  Livro.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

// PUT /books/:id
router.put('/:id', function(req, res) {
  Livro.update(req.params.id, req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp({ error: error.message }));
});

// DELETE /books/:id
router.delete('/:id', function(req, res) {
  Livro.delete(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp({ error: error.message }));
});

module.exports = router;