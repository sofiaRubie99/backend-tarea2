const fs = require('fs');
const path = require('path');

let books = [];

// Obtener la ruta absoluta para el archivo JSON de books
//const booksFilePath = path.join(__dirname, 'D:/sofia/backend-tarea2/netlify/functions/books.json');
const booksFilePath = path.join(__dirname, 'books.json');
// Cargar datos desde el archivo JSON de books
const loadBooks = () => {
    try {
        const data = fs.readFileSync(booksFilePath, 'utf8');
        books = JSON.parse(data);
    } catch (err) {
        console.error('Error reading books file:', err);
    }
};

// Cargar los datos al iniciar la función
loadBooks();

// Manejar la función Lambda
exports.handler = async (event) => {
    const { httpMethod, path } = event;

    let response;

    // Solo permitir la ruta '/api'
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
