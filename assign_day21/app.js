const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// ---------------------------------------------------------------------
// 1. Custom Logging Middleware (Challenge 1)
// Logs: [METHOD] URL at timestamp
// ---------------------------------------------------------------------
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.url} at ${timestamp}`);
  next();
});

// ---------------------------------------------------------------------
// 2. Built-in Middleware for Parsing JSON & URL-encoded Data (Challenge 2)
// ---------------------------------------------------------------------
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses form data

// ---------------------------------------------------------------------
// 3. View Engine Setup (EJS for Dynamic Templates) (Challenge 3)
// ---------------------------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------------------------------------------------------------------
// Dummy Data: Course List (for templates)
// ---------------------------------------------------------------------
const courses = [
  { id: 1, title: "Node.js Basics", level: "Beginner", duration: "4 weeks" },
  { id: 2, title: "Express.js Deep Dive", level: "Intermediate", duration: "3 weeks" },
  { id: 3, title: "Full-Stack with Node & React", level: "Advanced", duration: "8 weeks" }
];

// ---------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------

// Home: redirect to /courses
app.get("/", (req, res) => {
  res.redirect("/courses");
});

// Challenge 3: Render courses page using EJS
app.get("/courses", (req, res) => {
  res.render("courses", { courses });
});

// Challenge 2: Handle POST /users with parsed body
app.post("/users", (req, res) => {
  // req.body will contain JSON or form data
  const userData = req.body;

  res.status(201).json({
    message: "User created successfully",
    data: userData
  });
});

// A simple route to test JSON body
// Example: POST http://localhost:3000/test-json with JSON body
app.post("/test-json", (req, res) => {
  res.json({
    received: req.body,
    info: "This shows that express.json() is working!"
  });
});

// 404 handler (optional)
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// ---------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

