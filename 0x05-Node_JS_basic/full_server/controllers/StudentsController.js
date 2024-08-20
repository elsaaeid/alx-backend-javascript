const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    readDatabase(process.argv[2])
      .then((data) => {
        const printData = [];
        printData.push('This is the list of our students');
        for (const field in data) {
          if (field) printData.push(`Number of students in ${field}: ${data[field].number}. ${data[field].list}`);
        }
        res.send(printData.join('\n'));
      })
      .catch((err) => { res.send(err.message); });
  }

  static getAllStudentsByMajor(request, response) {
    if (!['SWE', 'CS'].includes(req.params.major)) res.status(500).send('Major parameter must be CS or SWE');
    else {
      readDatabase(process.argv[2])
        .then((data) => {
          if (Object.keys(data).length > 0) res.send(data[req.params.major].list);
          res.send(500, 'Cannot load the database');
        })
        .catch((err) => { res.send(err.message); });
    }
  }
}

module.exports = StudentsController;
