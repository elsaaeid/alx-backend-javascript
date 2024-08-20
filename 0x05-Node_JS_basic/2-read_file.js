const fs = require('fs');

/**
 * Counts the number of students in each field from a CSV file.
 * @param {string} filePath - Path to the database file.
 */
function countStudents(filePath) {
  try {
    // Read the CSV file synchronously
    const fileContent = fs.readFile(filePath, 'utf8');
    const lines = fileContent.split('\n').filter((line) => line.trim() !== '');
    const studentRecords = lines.slice(1); // Exclude header line
    const totalStudents = studentRecords.length;
    const studentGroups = {};

    // Process each student record
    studentRecords.forEach((record) => {
      const studentData = record.split(',');
      const field = studentData[studentData.length - 1].trim();

      // Initialize the field group if it doesn't exist
      if (!studentGroups[field]) {
        studentGroups[field] = { count: 1, firstNames: [studentData[0].trim()] };
      } else {
        studentGroups[field].count += 1; // Increment count
        studentGroups[field].firstNames.push(studentData[0].trim());
      }
    });

    // Log the total number of students
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field
    for (const [field, data] of Object.entries(studentGroups)) {
      const firstNamesList = data.firstNames.join(', ');
      console.log(`Number of students in ${field}: ${data.count}. List: ${firstNamesList}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
