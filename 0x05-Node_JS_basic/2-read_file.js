const fs = require('fs');
/**
 * Counts the number of students in each field from a CSV file.
 * @param {string} filePath - Path to the database file.
 */
function countStudents(filePath) {
  try {
    const lines = fs.readFileSync(filePath, { encoding: 'utf8' }).split(/\r?\n/);
    let i = 0;
    let countStudents = 0;
    const fields = {};

    // Use a while loop to iterate through the lines
    while (i < lines.length) {
      const line = lines[i];
      if (line.trim() !== '' && i > 0) {
        countStudents += 1;
        const [fname, lname, age, field] = line.split(','); // eslint-disable-line
        if (!fields[field]) {
          fields[field] = {
            count: 1,
            students: [fname],
          };
        } else {
          const newCount = fields[field].count + 1;
          const newStudents = fields[field].students.concat(fname);
          fields[field] = {
            count: newCount,
            students: newStudents,
          };
        }
      }
      i += 1; // Increment the index
    }

    console.log(`Number of students: ${countStudents}`);
    for (const field of Object.keys(fields)) {
      const studentsNum = fields[field].count;
      const names = fields[field].students.join(', ');
      console.log(`Number of students in ${field}: ${studentsNum}. List: ${names}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
