"use strict";
const mongoose = require('mongoose');

// Genre schema creation. The schema is not for the database, but for the application
let genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

let Genre = module.exports = mongoose.model('Genre', genreSchema);

// function to get Genres
module.exports.getGenres = (callback, limit) => {
    Genre.find(callback).limit(limit);
};

module.exports.addGenre = (genre, callback) => {
    Genre.create(genre, callback);
};

module.exports.getGenreById = (id, callback) => {
    Genre.findById(id, callback)
};

module.exports.updateGenre = (id, genre, options, callback) => {
    let query = {_id: id};
    let update = {
        name: genre.name
    };
    Genre.findOneAndUpdate(query, update, options, callback)
};