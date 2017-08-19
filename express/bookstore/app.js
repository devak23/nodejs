"use strict";
const
    express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    BOOKSTORE_URL = '/bookstore/api/v1/',
    Book = require('./models/book'),
    Genre = require('./models/genre');

app.use(bodyParser.json);

// connect to mongoose
mongoose.connect("mongodb://localhost/bookstore");
const db = mongoose.connection;

// set up routes
app.get('/bookstore', (req, res) => {
    let message = "****************************************************************\r\n"
        + "Welcome to Abhay's bookstore.\r\n"
        + "Please use /api/books or /api/genres to access the application\r\n"
        + "****************************************************************";
    res.status(200);
    res.set('Content-Type', 'text/text');
    res.send(message);
});


app.get(BOOKSTORE_URL + 'genres', (req, res) => {
    Genre.getGenres((err, genres) => {
        if (err) {
            throw err;
        }
        res.json(genres);
    })
});

app.get(BOOKSTORE_URL + 'genres/:_id', (req, res) => {
    Genre.getGenreById(req.params._id, (err, genre) => {
        if (err) {
            throw err;
        }
        res.json(genre);
    })
});

app.post(BOOKSTORE_URL + 'genres', (req, res) => {
    let genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        res.json(genre);
    });
});


app.get(BOOKSTORE_URL + 'books', (req, res) => {
   Book.getBooks((err, books) => {
       if (err) {
           throw err;
       }
       res.json(books);
   });
});


app.get(BOOKSTORE_URL + 'books/:_id', (req, res) => {
   Book.getBookById(req.params._id, (err, book) => {
       if (err) {
           throw err;
       }
       res.json(book)
   })
});

app.listen(port, () => {
    console.log("Running on port", port)
});

