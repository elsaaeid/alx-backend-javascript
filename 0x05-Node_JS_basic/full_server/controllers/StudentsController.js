const readDatabase = require('../utils');

const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const studentGroups = await readDatabase(DB_FILE);
      const reports = ['This is the list of our students'];

      Object.keys(studentGroups)
        // Sort fields case-insensitively
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .forEach((field) => {
          const studentsList = studentGroups[field].map((student) => student.firstname);
          reports.push(`Number of students in ${field}: ${studentGroups[field].length}. List: ${studentsList.join(', ')}`);
        });

      res.status(200).send(reports.join('\n'));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const dbFilePath = req.query.db || './database.csv'; // Get the database file path from query or default
    const { major } = req.params; // Destructure major from req.params
  
    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }
  
    try {
      const studentGroups = await readDatabase(dbFilePath);
      const studentsInMajor = studentGroups[major] || [];
      const firstNames = studentsInMajor.map((student) => student.firstname).join(', ');
  
      res.status(200).send(`List: ${firstNames}`);
      return; // Ensure a consistent return
    } catch (error) {
      res.status(500).send(error.message);
      return; // Ensure a consistent return
    }
  }
}

module.exports = StudentsController;
