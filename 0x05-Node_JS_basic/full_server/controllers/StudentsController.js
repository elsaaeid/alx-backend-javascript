import { readDatabase } from '../utils.js';

export class StudentsController {
    static async getAllStudents(req, res) {
        try {
            const students = await readDatabase(process.argv[2]);
            res.status(200).write('This is the list of our students\n');
            const fields = Object.keys(students).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

            fields.forEach(field => {
                res.write(`Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`);
            });
            res.end();
        } catch (error) {
            res.status(500).send('Cannot load the database');
        }
    }

    static async getAllStudentsByMajor(req, res) {
        const { major } = req.params;
        if (major !== 'CS' && major !== 'SWE') {
            return res.status(500).send('Major parameter must be CS or SWE');
        }

        try {
            const students = await readDatabase(process.argv[2]);
            res.status(200).send(`List: ${students[major].join(', ')}\n`);
        } catch (error) {
            res.status(500).send('Cannot load the database');
        }
    }
}
