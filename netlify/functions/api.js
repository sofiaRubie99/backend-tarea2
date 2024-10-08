const fs = require('fs');
const cors = require('cors');

let authors = [];
let books = [];
let publishers = [];

// Cargar datos desde archivos JSON
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

// Cargar los datos al iniciar la función
loadAuthors();
loadBooks();
loadPublishers();

// Manejar la función Lambda
exports.handler = async (event) => {
    const { httpMethod, path } = event;

    let response;

    switch (httpMethod) {
        case 'GET':
            if (path === '/authors') {
                response = {
                    statusCode: 200,
                    body: JSON.stringify(authors),
                };
            } else if (path.match(/\/authors\/\d+/)) {
                const authorId = parseInt(path.split('/')[2]);
                const author = authors.find(a => a.id === authorId);
                if (!author) {
                    response = {
                        statusCode: 404,
                        body: JSON.stringify({ error: 'Author not found' }),
                    };
                } else {
                    response = {
                        statusCode: 200,
                        body: JSON.stringify(author),
                    };
                }
            } else if (path === '/books') {
                response = {
                    statusCode: 200,
                    body: JSON.stringify(books),
                };
            } else if (path.match(/\/books\/\d+/)) {
                const bookId = parseInt(path.split('/')[2]);
                const book = books.find(b => b.id === bookId);
                if (!book) {
                    response = {
                        statusCode: 404,
                        body: JSON.stringify({ error: 'Book not found' }),
                    };
                } else {
                    response = {
                        statusCode: 200,
                        body: JSON.stringify(book),
                    };
                }
            } else if (path === '/publishers') {
                response = {
                    statusCode: 200,
                    body: JSON.stringify(publishers),
                };
            } else if (path.match(/\/publishers\/\d+/)) {
                const publisherId = parseInt(path.split('/')[2]);
                const publisher = publishers.find(p => p.id === publisherId);
                if (!publisher) {
                    response = {
                        statusCode: 404,
                        body: JSON.stringify({ error: 'Publisher not found' }),
                    };
                } else {
                    response = {
                        statusCode: 200,
                        body: JSON.stringify(publisher),
                    };
                }
            } else {
                response = {
                    statusCode: 404,
                    body: JSON.stringify({ error: 'Not found' }),
                };
            }
            break;
        default:
            response = {
                statusCode: 405,
                body: JSON.stringify({ error: 'Method not allowed' }),
            };
            break;
    }

    return response;
};
