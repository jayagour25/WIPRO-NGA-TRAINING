// server.js
const express = require("express");
const courseRoutes = require("./routes/courses");

const app = express();
const PORT = 4000;

// Root Route (Challenge 1)
app.get("/", (req, res) => {
  res.send("Welcome to SkillSphere LMS API");
});

// Course Routes
app.use("/courses", courseRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
