/**
 * Create a more complex HTTP server using Express
 */
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
// Get file if arguement was passed
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
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
      index += 1;
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
// Make the server listen on port 1245
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
module.exports = app;
