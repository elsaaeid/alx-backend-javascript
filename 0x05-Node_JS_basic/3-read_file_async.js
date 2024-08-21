const fs = require('fs').promises;

/**
 * Counts the number of students in each field
 * from a CSV file asynchronously.
 * @param {string} filePath - Path to the database file.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return; // Ensure we exit the function after rejection
  }
  fs.readFile(filePath, (err, data) => {
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
    console.log(reports.join('\n'));
  });
});
module.exports = countStudents;
