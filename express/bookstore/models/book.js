"use strict";
const
    mongoose = require('mongoose');

// Creating schema for the book
let bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false
    },
    buy_url: {
        type: String,
        required: false
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export the model via module.exports
let Book = module.exports = mongoose.model('Book', bookSchema);

// function to get all the books
module.exports.getBooks = (callback, limit) => {
    Book.find(callback).limit(limit)
};

module.exports.getBookById = (id, callback) => {
    Book.findById(id, callback)
};

module.exports.addBook = (book, callback) => {
    Book.create(book, callback);
};

module.exports.updateBook = (id, book, options, callback) => {
    let query = {_id: id};
    let update = {
        title:    book.title,
        genre:    book.genre,
        desc:     book.desc,
        author:   book.author,
        publisher:book.publisher,
        pages:    book.pages,
        image_url:book.image_url,
        buy_url:  book.buy_url
    };
    Book.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteBook = (id, callback) => {
    Book.findByIdAndRemove(id, callback);
};