const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let authors = [];
let books = [];
let publishers = [];

const loadAuthors = () => {
    fs.readFile('./authors.json', 'utf8', (err, data) => {
        if (!err) {
            authors = JSON.parse(data);
        }
    });
};

const loadBooks = () => {
    fs.readFile('./books.json', 'utf8', (err, data) => {
        if (!err) {
            books = JSON.parse(data);
        }
    });
};

const loadPublishers = () => {
    fs.readFile('./publishers.json', 'utf8', (err, data) => {
        if (!err) {
            publishers = JSON.parse(data);
        }
    });
};

loadAuthors();
loadBooks();
loadPublishers();

app.get('/authors', (req, res) => res.json(authors));
app.get('/authors/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);
    if (!author) return res.status(404).send('Author not found');
    res.json(author);
});
app.get('/books', (req, res) => res.json(books));
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});
app.get('/publishers', (req, res) => res.json(publishers));
app.get('/publishers/:id', (req, res) => {
    const publisherId = parseInt(req.params.id);
    const publisher = publishers.find(p => p.id === publisherId);
    if (!publisher) return res.status(404).send('Publisher not found');
    res.json(publisher);
});

exports.handler = async (event, context) => {
    return new Promise((resolve) => {
        app.handle(event, context, resolve);
    });
};
