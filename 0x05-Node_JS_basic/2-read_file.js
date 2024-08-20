const fs = require('fs');

function countStudents(path) {
  try {
    // Attempt to read the file synchronously
    const data = fs.readFileSync(path, 'utf8');

    /*
    Split the data into lines and
    filter out empty lines
    */
    const lines = data.split('\n')
      .filter(line => line.trim() !== '');

    /*
    Initialize a map to hold the
    counts and names of students by field
    */

    const studentCounts = {};

    // Process each line (skip the header)
    for (let i = 1; i < lines.length; i++) {
      const [firstName, field] = lines[i].split(',');
      if (field) {
        // Initialize the field if it doesn't exist
        if (!studentCounts[field]) {
          studentCounts[field] = { count: 0, names: [] };
        }
        // Increment the count and add the student's name
        studentCounts[field].count += 1;
        studentCounts[field].names.push(firstName);
      }
    }

    // Log the total number of students
    const totalStudents = lines.length - 1; // Exclude header
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field
    for (const [field, { count, names }] of Object.entries(studentCounts)) {
      console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    // If the file cannot be read, throw an error
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
