const http = require("http");
const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "logs");
if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

fs.writeFileSync(path.join(logPath, "app.log"), "App started\n");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "running" }));
});

server.listen(3000, () => console.log("Server running on 3000"));
