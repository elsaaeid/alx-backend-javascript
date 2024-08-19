const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the root endpoint
app.get('/', (req, res) => {
    res.send('Hello Holberton School!\n');
});

// Make the server listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Export the app
module.exports = app;
