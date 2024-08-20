/**
 * Create a small HTTP server using Express
 */
const express = require('express');

const app = express();
const PORT = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}\n`));

module.exports = app;
