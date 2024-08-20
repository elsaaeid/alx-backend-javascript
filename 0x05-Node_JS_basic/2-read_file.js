const fs = require('fs');
/**
 * Counts the number of students in each field from a CSV file.
 * @param {string} filePath - Path to the database file.
 */

function countStudents(filePath) {
  try {
    const results = fs.readFileSync(filePath, { encoding: 'utf8' }).split(/\r?\n/);
    const lines = results;
    let i = 0;
    let countStudents = 0;
    const fields = {};

    for (const line of lines) {
      if (line.trim() !== '' && i > 0) {
        countStudents += 1;
        const [field, data] = line.split(',');
        if (!fields[field]) {
          fields[field] = {
            count: 1,
            students: [data.fname],
          };
        } else {
          const newCount = fields[field].count + 1;
          const newStudents = (fields[field].students).concat(data.fname);
          fields[field] = {
            count: newCount,
            students: newStudents,
          };
        }
      }
      i += 1;
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
