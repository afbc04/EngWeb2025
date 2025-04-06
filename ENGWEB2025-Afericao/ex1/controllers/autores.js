var Autor = require('../models/autores')

module.exports.getAuthorByID = id => {
    return Autor
        .findById(id)
        .exec()
}