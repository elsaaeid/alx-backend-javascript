const fs = require('fs');

/**
 * Reading a file synchronously with Node JS
 * @param {str} path -Path to database file
 * structure of the object in the function
 * obj = {
 *  CS: {count: 6, firstname: []}
 *  SW: {count: 4, firstname: []}
 *};
 */

module.exports = function countStudents(path) {
  try {
    const fileData = fs.readFileSync(path, 'utf8');
    const lines = fileData.split('\n');
    const students = lines.slice(1, -1);
    const numberOfStudents = students.length;
    const obj = {};

    students.forEach((student) => {
      const data = student.split(',');
      const field = data[data.length - 1];

      // Store data of people with the same field in an obj
      // with each field as the key of the object
      if (!obj[field]) {
        obj[field] = {};
        obj[field].firstname = [];
        obj[field].count = 1;
      } else {
        obj[field].count += 1;
      }
      obj[field].firstname.push(data[0]);
    });

    console.log(`Number of students: ${numberOfStudents}`);

    for (const [field, value] of Object.entries(obj)) {
      const firstnames = value.firstname.join(', ');
      console.log(
        `Number of students in ${field}: ${value.count}. List: ${firstnames}`,
      );
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};
