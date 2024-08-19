const fs = require('fs').promises;

async function countStudents(path) {
    try {
        // Read the CSV file asynchronously
        const data = await fs.readFile(path, 'utf8');

        // Split the data into lines and filter out empty lines
        const lines = data.split('\n').filter(line => line.trim() !== '');

        // Initialize a counter for total students and a map for field counts
        const totalStudents = lines.length - 1; // Exclude header
        const fieldCounts = {};
        
        // Process each line (skip the header)
        for (let i = 1; i < lines.length; i++) {
            const [firstName, field] = lines[i].split(',');

            // Check if the field is already in the map
            if (!fieldCounts[field]) {
                fieldCounts[field] = [];
            }
            // Add the student's name to the corresponding field
            fieldCounts[field].push(firstName);
        }

        // Log the total number of students
        console.log(`Number of students: ${totalStudents}`);

        // Log the number of students in each field
        for (const field in fieldCounts) {
            const names = fieldCounts[field];
            console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        }

        return Promise.resolve(); // Resolve the promise
    } catch (error) {
        // Handle file read errors
        return Promise.reject(new Error('Cannot load the database'));
    }
}

module.exports = countStudents;
