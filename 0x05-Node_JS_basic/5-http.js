/**
 * Create a more complex HTTP server using Node's HTTP module
 */
const http = require('http');
const url = require('url');
const fs = require('fs').promises;

/**
 * Counts the number of students in each field
 * from a CSV file asynchronously.
 * @param {string} filePath - Path to the database file.
 */
const countStudents = async (filePath) => {
  try {
    // Attempt to read the file data asynchronously
    const fileContent = await fs.readFile(filePath, 'utf8');
    const lines = fileContent.split('\n').filter((line) => line.trim() !== '');
    const studentRecords = lines.slice(1); // Exclude header line
    const totalStudents = studentRecords.length;
    const studentGroups = {};

    // Process each student record
    studentRecords.forEach((record) => {
      const studentData = record.split(',');
      const field = studentData[studentData.length - 1].trim();

      // Initialize the field group if it doesn't exist
      if (!studentGroups[field]) {
        studentGroups[field] = { count: 1, firstNames: [studentData[0].trim()] };
      } else {
        studentGroups[field].count += 1; // Increment count
        studentGroups[field].firstNames.push(studentData[0].trim());
      }
    });

    // Log the total number of students
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field
    for (const [field, data] of Object.entries(studentGroups)) {
      const firstNamesList = data.firstNames.join(', ');
      console.log(`Number of students in ${field}: ${data.count}. List: ${firstNamesList}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};


// Port
const PORT = 1245;
// Get file if arguement was passed
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
        studentReport.push(data);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(studentReport.join('\n'));
        res.end();
      })
      .catch((err) => {
        studentReport.push(err instanceof Error ? err.message : err.toString());
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write(studentReport.join('\n'));
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

module.exports = app;
