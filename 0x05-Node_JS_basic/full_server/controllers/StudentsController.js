const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(DB_FILE)
      .then((studentGroups) => {
        const printData = [];
        printData.push('This is the list of our students');
        for (const field in studentGroups) {
          if (field) printData.push(`Number of students in ${field}: ${studentGroups[field].number}. ${studentGroups[field].list}`);
        }
        res.send(printData.join('\n'));
      })
      .catch((err) => { res.send(err.message); });
  }

  static getAllStudentsByMajor(req, res) {
    if (!['SWE', 'CS'].includes(req.params.major)) res.status(500).send('Major parameter must be CS or SWE');
    else {
      readDatabase(process.argv[2])
        .then((studentGroups) => {
          if (Object.keys(studentGroups).length > 0) res.send(studentGroups[req.params.major].list);
          res.send(500, 'Cannot load the database');
        })
        .catch((err) => { res.send(err.message); });
    }
  }
}

module.exports = StudentsController;
