var mongoose = require('mongoose')

var booksSchema = new mongoose.Schema({
    _id : String,
    title : String,
    series : String,
    author : String,
    rating : Number,
    description : String,
    language : String,
    isbn : String,
    genres : [String],
    characters : [String],
    bookFormat : String,
    edition : String,
    pages : String,
    publisher : String,
    publishDate : String,
    firstPublishDate : String,
    awards : [String],
    numRatings : Number,
    ratingsBYStars : [String],
    likedPercent : Number,
    setting : [String],
    coverImg : String,
    bbeScore : Number,
    bbeVotes : Number,
    price : Number
}, {versionKey : false})


module.exports = mongoose.model('livros', booksSchema)
