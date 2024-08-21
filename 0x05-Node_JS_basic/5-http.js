const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const fs = require('fs').promises;

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
    return; // Ensure we exit the function after rejection
  }
  
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return; // Ensure we exit the function after rejection
    }

    const reports = [];
    const fileLines = data.toString('utf-8').trim().split('\n');
    const studentGroups = {};
    const FieldNames = fileLines[0].split(',');
    const studentPropertyNames = FieldNames.slice(0, FieldNames.length - 1);

    // Replace the for...of loop with a while loop
    let index = 1; // Start from the second line (after header)
    while (index < fileLines.length) {
      const line = fileLines[index];
      const studentRecord = line.split(',');
      const studentPropertyValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];

      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }

      const studentEntries = studentPropertyNames.map((propertyName, idx) => [
        propertyName,
        studentPropertyValues[idx],
      ]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
      
      index++; // Increment the index to move to the next line
    }

    const totalStudents = Object.values(studentGroups).reduce(
      (pre, cur) => (pre || []).length + cur.length,
    );
    reports.push(`Number of students: ${totalStudents}`);

    for (const [field, group] of Object.entries(studentGroups)) {
      reports.push([
        `Number of students in ${field}: ${group.length}.`,
        'List:',
        group.map((student) => student.firstname).join(', '),
      ].join(' '));
    }
    
    resolve(reports.join('\n'));
  });
});


// HTTP SERVER
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (pathname === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (pathname === '/students') {
    const studentReport = [];
    studentReport.push('This is the list of our students');

    countStudents(DB_FILE)
      .then((data) => {
        studentReport.push(data);
        res.write(studentReport.join('\n'));
        res.end();
      })
      .catch((err) => {
        studentReport.push(err instanceof Error ? err.message : err.toString());
        res.write(studentReport.join('\n'));
        res.end();
      });
  }
});

// Make the server listen on port 1245
const app = server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
