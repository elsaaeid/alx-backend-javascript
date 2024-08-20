const fs = require('fs');

/**
 * Reads the database file and organizes student data by field.
 * @param {string} path - The path to the database file.
 * @returns {Promise<Object>} - A promise that resolves with student data grouped by field.
 */
const readDatabase = (path) => new Promise((resolve, reject) => {
  if (!path) {
    return reject(new Error('Cannot load the database'));
  }

  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return reject(new Error('Cannot load the database'));
    }

    const lines = data.split('\n').filter(line => line.trim() !== '');
    const studentRecords = lines.slice(1); // Exclude header line
    const totalStudents = studentRecords.length;
    const studentGroups = {};

    // Process each student record
    studentRecords.forEach(record => {
      const studentData = record.split(',');
      const firstName = studentData[0].trim();
      const field = studentData[studentData.length - 1].trim();

      // Initialize the field group if it doesn't exist
      if (!studentGroups[field]) {
        studentGroups[field] = { count: 1, firstNames: [firstName] };
      } else {
        studentGroups[field].count += 1; // Increment count
        studentGroups[field].firstNames.push(firstName);
      }
    });

    // Log the total number of students
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field
    for (const [field, data] of Object.entries(studentGroups)) {
      const firstNamesList = data.firstNames.join(', ');
      console.log(`Number of students in ${field}: ${data.count}. List: ${firstNamesList}`);
    }

    resolve(studentGroups);
  });
});

module.exports = readDatabase;
