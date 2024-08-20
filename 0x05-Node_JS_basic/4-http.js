/**
 * Create a small HTTP server using Node's HTTP module
 */

const http = require('http');

// Create an HTTP server
const app = http.createServer((req, res) => {
  res.write('Hello Holberton School!');
  res.end();
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app
module.exports = app;
