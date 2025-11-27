// middleware/errorHandler.js

// 404 handler (no route matched)
function notFoundHandler(req, res, next) {
  res.status(404).json({ error: "Route not found" });
}

// Centralized error handler (500)
function errorHandler(err, req, res, next) {
  console.error("Error stack:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
