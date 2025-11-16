// Import HTTP module
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Send HTML content
  res.end(`
    <html>
      <head>
        <title>My Node.js Server</title>
      </head>
      <body>
        <h1>Hello from Node.js!</h1>
        <p>This is a simple web server without Express.</p>
      </body>
    </html>
  `);
});

// Start server on port 3000
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
