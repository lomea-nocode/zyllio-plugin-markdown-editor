// Simple HTTP server for testing the plugin
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PLUGIN_PATH = path.join(__dirname, 'dist', 'plugin.js');

const server = http.createServer((req, res) => {
  // Enable CORS for Zyllio
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.url === '/plugin.js') {
    fs.readFile(PLUGIN_PATH, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Plugin not found. Run "npm run build" first.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>Zyllio Plugin Server</h1>
          <p>Plugin URL: <code>http://localhost:${PORT}/plugin.js</code></p>
          <p>Use this URL in Zyllio Studio to load the plugin.</p>
        </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`✅ Plugin server running at http://localhost:${PORT}/`);
  console.log(`📦 Plugin URL: http://localhost:${PORT}/plugin.js`);
  console.log('\nUse this URL in Zyllio Studio to load the plugin.');
});
