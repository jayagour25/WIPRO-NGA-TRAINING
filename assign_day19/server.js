// server.js
const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const bookRouter = require("./routes/books");

const app = express();
const PORT = 4000;

// ========== Global Middleware ==========

// Allow CORS (Extended project)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Custom logger middleware (Challenge 3)
app.use(logger);

// ========== Routes ==========

// Challenge 1: Basic route /
app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

// Challenge 1 Bonus: /status route returning JSON
app.get("/status", (req, res) => {
  res.json({
    server: "running",
    uptime: "OK",
    uptimeSeconds: process.uptime().toFixed(0)
  });
});

// Challenge 2: /products with query parameter ?name=
app.get("/products", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      message: "Please provide a product name"
    });
  }

  // Bonus: return JSON instead of plain text
  res.json({
    query: name,
    message: `Searching for product: ${name}`
  });
});

// Challenge 4 & 5: Books routes modularized
app.use("/books", bookRouter);

// ========== Error Handling ==========

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be after all middleware & routes)
app.use(errorHandler);

// ========== Start the Server ==========

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
