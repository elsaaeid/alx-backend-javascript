/**
 * Create a more complex HTTP server using Express
 */
const express = require('express');
// Import the countStudents function
const countStudents = require('./3-read_file_async');

const app = express();
// Get file if arguement was passed
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const studentReport = [];
  studentReport.push('This is the list of our students');
  countStudents(DB_FILE)
    .then((data) => {
      studentReport.push(data);
      res.send(studentReport.join('\n'));
    })
    .catch((err) => {
      studentReport.push(err instanceof Error ? err.message : err.toString());
      res.send(studentReport.join('\n'));
    });
});

const PORT = 1245;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
