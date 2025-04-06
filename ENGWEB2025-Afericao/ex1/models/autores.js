var mongoose = require('mongoose')

var authorSchema = new mongoose.Schema({
    _id : String,
    name: String,
    books: [
        {
            bookId: String,
            title: String,
            series: String,
            genres: [String],
            publishDate: String
        }
    ],
    books_count: Number
}, {versionKey : false})


module.exports = mongoose.model('autores', authorSchema)
