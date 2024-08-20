/**
 * Create a small HTTP server using Express
 */

const express = require('express');

const app = express();
const PORT = 1245;


// Define the root endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Make the server listen on port 1245
app.listen(PORT, () => console.log(`Listening on port ${PORT}\n`));

// Export the app
module.exports = app;
