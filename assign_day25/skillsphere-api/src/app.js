const express = require("express");
const compression = require("compression");
const coursesRouter = require("./routes/courses");
const usersRouter = require("./routes/users");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(compression());          // gzip for performance :contentReference[oaicite:2]{index=2}
app.use(express.json());

// Health / deployment status
app.get("/status", (req, res) => {
  res.json({ status: "App is live" });
});

// API routes
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
