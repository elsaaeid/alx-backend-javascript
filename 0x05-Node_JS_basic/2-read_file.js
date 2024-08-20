const fs = require('fs');

const countStudents = (filePath) => {
  try {
    // Read the file and split into lines
    const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
    const studentGroups = {};
    const headerFields = lines[0].split(',');
    const studentPropertyNames = headerFields.slice(0, headerFields.length - 1);

    // Process each student record
    for (const line of lines.slice(1)) {
      const studentRecord = line.split(',');
      const studentValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];

      // Initialize the field group if it doesn't exist
      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }

      // Create an object for the student and add it to the group
      const studentEntries = studentPropertyNames.map((propertyName, index) =>
        [propertyName, studentValues[index]]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    // Calculate total number of students
    const totalStudents = Object.values(studentGroups)
      .reduce((total, group) => total + group.length, 0);
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field
    for (const [field, group] of Object.entries(studentGroups)) {
      const studentNames = group.map(student => student.firstname).join(', ');
      console.log(
        `Number of students in ${field}: ${group.length}. List: ${studentNames}`
      );
    }

  } catch (err) {
  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('Cannot load the database');
    }

    // Check if the path is a file
    if (!fs.statSync(filePath).isFile()) {
      throw new Error('Cannot load the database');
    }
};

module.exports = countStudents;
