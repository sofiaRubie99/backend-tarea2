const fs = require('fs').promises;
const path = require('path');

let authors = [];
let books = [];
let publishers = [];

// Obtener la ruta absoluta para los archivos JSON
const authorsFilePath = path.join(__dirname, 'authors.json');
const booksFilePath = path.join(__dirname, 'books.json');
const publishersFilePath = path.join(__dirname, 'publishers.json');

// Cargar datos desde archivos JSON
const loadAuthors = async () => {
    try {
        const data = await fs.readFile(authorsFilePath, 'utf8');
        authors = JSON.parse(data);
    } catch (err) {
        console.error('Error loading authors:', err);
    }
};

const loadBooks = async () => {
    try {
        const data = await fs.readFile(booksFilePath, 'utf8');
        books = JSON.parse(data);
    } catch (err) {
        console.error('Error loading books:', err);
    }
};

const loadPublishers = async () => {
    try {
        const data = await fs.readFile(publishersFilePath, 'utf8');
        publishers = JSON.parse(data);
    } catch (err) {
        console.error('Error loading publishers:', err);
    }
};

// Cargar los datos al iniciar la función
const loadData = async () => {
    await loadAuthors();
    await loadBooks();
    await loadPublishers();
};

loadData();

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
