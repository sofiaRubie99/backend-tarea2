const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 1337;


let authors = [];
let books = [];
let publishers = [];

const loadAuthors = () => {
    fs.readFile(__dirname + '/authors.json', 'utf8', (err, data) => {
        if (!err) {
            authors = JSON.parse(data);
        }
    });
};

const loadBooks = () => {
    fs.readFile(__dirname + '/books.json', 'utf8', (err, data) => {
        if (!err) {
            books = JSON.parse(data);
        }
    });
};

const loadPublishers = () => {
    fs.readFile(__dirname + '/publishers.json', 'utf8', (err, data) => {
        if (!err) {
            publishers = JSON.parse(data);
        }
    });
};


loadAuthors();
loadBooks();
loadPublishers();

// Authors
app.get('/authors', (req, res) => {
    res.json(authors);
});

app.get('/authors/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);
    if (!author) {
        return res.status(404).send('Author not found');
    }
    res.json(author);
});

//Books
app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.json(book);
});

//Publishers
app.get('/publishers', (req, res) => {
    res.json(publishers);
});

app.get('/publishers/:id', (req, res) => {
    const publisherId = parseInt(req.params.id);
    const publisher = publishers.find(p => p.id === publisherId);
    if (!publisher) {
        return res.status(404).send('Publisher not found');
    }
    res.json(publisher);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
