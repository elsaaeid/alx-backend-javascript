const http = require('http');
const countStudents = require('./3-read_file_async'); // Import the countStudents function

// Create an HTTP server
const app = http.createServer(async (req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (req.url === '/') {
        // Respond to the root path
        res.end('Hello Holberton School!\n');
    } else if (req.url === '/students') {
        // Respond to the /students path
        res.write('This is the list of our students\n');
        try {
            // Call countStudents with the database file path
            await countStudents(process.argv[2]); // Pass the database file as an argument
            res.end(); // End the response
        } catch (error) {
            res.write(error.message); // Write the error message if there's an issue
            res.end(); // End the response
        }
    } else {
        // Handle other paths
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found\n');
    }
});

// Make the server listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Export the app
module.exports = app;
