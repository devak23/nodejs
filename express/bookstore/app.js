"use strict";
const
  app         = require('express')(),
  port        = 3000,
  SERVER_ROOT = "http://localhost:" + port,
  bodyParser  = require('body-parser'),
  mongoose    = require('mongoose'),
  Book        = require('./models/book'),
  Genre       = require('./models/genre');

// connect to mongoose
mongoose.connect("mongodb://localhost/bookstore");
const db = mongoose.connection;

app.use(bodyParser.json());

// set up routes
app.get('/', (req, res) => {
  res.redirect('/bookstore');
});

app.get('/bookstore', (req, res)=> {
  res.status(200).json({
    message: "Welcome to the bookstore.Please use /api/books or /api/genres to access the application"
  });
});


// list all books
app.get("/bookstore/api/v1/books", (req, res, next) => {
  Book.getBooks((err, books) => {
    if (err) {
      res.status(err.status).json(err.message)
    } else {
      res.status(200).json(books);
    }
  });
});

// get a specific book
app.get("/bookstore/api/v1/books/:_id", (req, res, next) => {
  Book.getBookById(req.params._id, (err, book) => {
    if (err) {
      res.status(err.status).json(err.message)
    } else {
      res.status(200).json(book);
    }
  });
});

// add a book. Example:
// {
//   "title":"Spring in Action",
//   "genre":"Technical",
//   "desc":"Spring in Action, Fourth Edition is a hands-on guide to the Spring Framework, updated for version 4. It covers the latest features, tools, and practices including Spring MVC, REST, Security, Web Flow, and more. You'll move between short snippets and an ongoing example as you learn to build simple and efficient J2EE applications. Author Craig Walls has a special knack for crisp and entertaining examples that zoom in on the features and techniques you really need.",
//   "author":"Craig Walls",
//   "publisher":"Manning Publications; 4 edition",
//   "pages":"624",
//   "image_url":"https://images-na.ssl-images-amazon.com/images/I/51gHy16h5TL._SX397_BO1,204,203,200_.jpg",
//   "buy_url":"https://www.amazon.com/Spring-Action-Covers-4/dp/161729120X/ref=sr_1_5?ie=UTF8&qid=1503150537&sr=8-5&keywords=spring+security"
// }
app.post("/bookstore/api/v1/books", (req, res) => {
  let book = req.body;
  Book.addBook(book, (err, book) => {
    if (err) {
      res.status(err.status).json(err.message)
    } else {
      res.header("Location", SERVER_ROOT + "/bookstore/api/v1/books/" + book._id);
      res.status(201).json(book);
    }
  });
});

// update a book. example:
// {
//   "_id":"5997dcc7f3f0a9b9754de89a",
//   "title":"Passenger 19",
//   "genre":"Suspense",
//   "desc":"From the instant New York Times bestselling author of blockbuster thrillers In a Dark, Dark Wood and The Woman in Cabin 10 comes Ruth Ware’s chilling new novel, The Lying Game.",
//   "author":"Ward Larsen",
//   "publisher":"Oceanview Publishing",
//   "pages":"341",
//   "image_url":"https://images-na.ssl-images-amazon.com/images/I/51lwoSfT8iL.jpg",
//   "buy_url":"https://www.amazon.com/Passenger-19-Jammer-Davis-Thriller-ebook/dp/B015GY3TEI/ref=sr_1_2?ie=UTF8&qid=1503124243&sr=8-2&keywords=suspense",
//   "__v":0,
//   "create_date":"2017-08-20T06:14:32.287Z"
// }
app.put("/bookstore/api/v1/books/:_id", (req, res) => {
  let id = req.params._id;
  let book = req.body;
  console.log("Updating book", id);
  Book.updateBook(id, book, {}, (err) => {
    console.log("now in callback...");
    if (err) {
      res.status(err.status).json(err.message);
    } else {
      let message = {
        id: id,
        message: "Book has been updated"
      };
      res.status(200).json(message);
    }
  })
});


// list all genres
app.get("/bookstore/api/v1/genres", (req, res) => {
  Genre.getGenres((err, genres) => {
    if (err) {
      res.status(err.status).json(err.message)
    }
    res.status(200).json(genres);
  })
});

// add a new genre. Sample genre looks as follows:
// {
//     name: "Romantic"
// }
app.post("/bookstore/api/v1/genres", (req, res) => {
  let genre = req.body;
  Genre.addGenre(genre, (err, genre) => {
    if (err) {
      res.status(err.status).json(err.message)
    } else {
      res.header("Location", SERVER_ROOT + "/bookstore/api/v1/genres/" + genre._id);
      res.status(201).json(genre);
    }
  });
});

// get a specific genre
app.get("/bookstore/api/v1/genres/:_id", (req, res) => {
  Genre.getGenreById(req.params._id, (err, genre) => {
    if (err) {
      res.status(err.status).json(err.message)
    } else {
      res.status(200).json(genre);
    }
  })
});

app.put("/bookstore/api/v1/genres/:_id", (req, res) => {
  let id = req.params._id;
  let genre = req.body;
  Genre.updateGenre(id, genre,{}, (err) => {
    if (err) {
      res.status(err.status).json(err.message)
    } else {
      let message = {
        id: id,
        message: "Genre has been updated"
      };
      res.status(200).json(message);
    }
  });
});

app.delete('/bookstore/api/v1/genres/:_id', (req, res) => {
  let id = req.params._id;
  Genre.deleteGenre(id, (err) => {
    if (err) {
      res.status(err.status).json(err.message);
    } else {
      let message = {
        id: id,
        message: "Genre was deleted"
      };

      res.status(200).json(message);
    }
  })
});

app.listen(port, () => {
  console.log("Server running on port", port)
});
