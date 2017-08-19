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
    Book.save(book);
};