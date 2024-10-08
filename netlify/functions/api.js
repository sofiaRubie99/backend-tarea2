exports.handler = async (event, context) => {
    try {
        // Tu lógica aquí
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello from the API!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' }),
        };
    }
};
