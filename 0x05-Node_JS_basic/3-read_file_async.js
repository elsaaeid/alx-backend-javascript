const fs = require('fs').promises;

/**
 * Counts the number of students in each field from a CSV file asynchronously.
 * @param {string} filePath - Path to the database file.
 * @returns {Promise<void>}
 */

const countStudents = async (filePath)=> {
  try {
    // Attempt to read the file data asynchronously
    const fileContent = await fs.readFile(filePath, 'utf8');
    // Filter out empty lines
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    const studentRecords = lines.slice(1); // Exclude header line
    const numberOfStudents = studentRecords.length;
    const studentGroups = {};

    // Process each student record
    studentRecords.forEach((record) => {
      const studentData = record.split(',');
      // Get the field and trim whitespace
      const field = studentData[studentData.length - 1].trim();

      // Initialize the field group if it doesn't exist
      if (!studentGroups[field]) {
        // Initialize count and firstNames
        studentGroups[field] = { count: 1, firstNames: [studentData[0].trim()] };
      } else {
        studentGroups[field].count += 1; // Increment count
        // Add first name
        studentGroups[field].firstNames.push(studentData[0].trim());
      }
    });

    // Log the total number of students
    console.log(`Number of students: ${numberOfStudents}`);

    // Log the number of students in each field
    for (const [field, data] of Object.entries(studentGroups)) {
      const firstNamesList = data.firstNames.join(', ');
      console.log(
        `Number of students in ${field}: ${data.count}. List: ${firstNamesList}`
      );
    }
  } catch (error) {
    // Throw error if file cannot be read
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
