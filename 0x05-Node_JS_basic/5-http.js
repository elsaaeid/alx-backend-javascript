/**
 * Create a more complex HTTP server using Node's HTTP module
 */
const http = require('http');
const url = require('url');
// Import the countStudents function
const countStudents = require('./3-read_file_async');

// Port
const PORT = 1245;
// Get file if argument was passed
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

// HTTP SERVER
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello Holberton School!');
    res.end();
  } else if (pathname === '/students') {
    const studentReport = [];
    studentReport.push('This is the list of our students');

    countStudents(DB_FILE)
      .then((data) => {
        // Assuming data is an object with student counts and lists
        const { totalStudents, csStudents, sweStudents } = data;

        studentReport.push(`Number of students: ${totalStudents}`);
        studentReport.push(`Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}`);
        studentReport.push(`Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(studentReport.join('\n'));
        res.end();
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error reading student data: ' + (err instanceof Error ? err.message : err.toString()));
        res.end();
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found');
    res.end();
  }
});

// Make the server listen on port 1245
const app = server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Export the app
module.exports = app;
