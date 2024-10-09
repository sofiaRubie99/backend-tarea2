const fs = require('fs');
const path = require('path');

let books = [];

// Obtener la ruta absoluta para el archivo JSON de books
const booksFilePath = path.join(__dirname, 'books.json');

// Cargar datos desde el archivo JSON de books
const loadBooks = () => {
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading books file:', err);
        } else {
            books = JSON.parse(data);
            console.log('Books loaded successfully:', books);
        }
    });
};


loadBooks();

// Manejar la función Lambda
exports.handler = async (event) => {
    const { httpMethod, path } = event;

    let response;

    // Solo se manejará la ruta '/api'
    if (httpMethod === 'GET' && path === '/api') {
        response = {
            statusCode: 200,
            body: JSON.stringify(books),
        };
    } else {
        response = {
            statusCode: 404,
            body: JSON.stringify({ error: 'Not found' }),
        };
    }

    return response;
};
