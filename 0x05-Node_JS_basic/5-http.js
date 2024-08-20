const http = require('http');
const countStudents = require('./3-read_file_async');

// Port
const PORT = 1245;
// Get file if arguement was passed
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    let data = 'This is the list of our students\n';
    await countStudents(DB_FILE)
      .then((msg) => {
        data += msg;
        res.end(data);
      })
      .catch((err) => {
        data += err.message;
        res.end(data);
      });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
