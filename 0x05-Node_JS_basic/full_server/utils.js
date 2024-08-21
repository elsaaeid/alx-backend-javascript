const fs = require('fs');

/**
 * Reads the database file and organizes student data by field.
 * @param {string} filePath - The path to the database file.
 * @returns {Promise<Object>} - A promise that resolves with student data grouped by field.
 */
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return; // Ensure we exit the function after rejection
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return; // Ensure we exit the function after rejection
    }
    if (data) {
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const studentGroups = {};
      const FieldNames = fileLines[0].split(',');
      const studentPropertyNames = FieldNames
        .slice(0, FieldNames.length - 1);
      let index = 1; // Start from the second line (after header)
      while (index < fileLines.length) {
        const line = fileLines[index];
        const studentRecord = line.split(',');
        const studentPropertyValues = studentRecord
          .slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];

        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }
        const studentEntries = studentPropertyNames
          .map((PropertyName, idx) => [PropertyName, studentPropertyValues[idx]]);
        studentGroups[field].push(Object.fromEntries(studentEntries));

        index += 1; // Increment the index
      }
      resolve(studentGroups);
    }
  });
});
module.exports = readDatabase;
