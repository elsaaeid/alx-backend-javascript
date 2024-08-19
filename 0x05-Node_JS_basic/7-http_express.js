const express = require('express');
const countStudents = require('./3-read_file_async');


// Create an instance of an Express application
const app = express();

// Define the root endpoint
app.get('/', (req, res) => {
    res.send('Hello Holberton School!\n');
});

// Define the /students endpoint
app.get('/students', async (req, res) => {
    res.write('This is the list of our students\n');
    try {
        // Call countStudents with the database file path
        await countStudents(process.argv[2]); // Pass the database file as an argument
        res.end(); // End the response
    } catch (error) {
        res.write(error.message); // Write the error message if there's an issue
        res.end(); // End the response
    }
});


// Make the server listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Export the app
module.exports = app;
