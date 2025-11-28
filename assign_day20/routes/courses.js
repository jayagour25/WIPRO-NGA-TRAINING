// routes/courses.js
const express = require("express");
const validateCourseId = require("../middleware/validateCourseId");

const router = express.Router();

// GET /courses/:id  → Dynamic route with middleware
router.get("/:id", validateCourseId, (req, res) => {
  const { id } = req.params;

  res.json({
    id: id,
    name: "React Mastery",
    duration: "6 weeks",
  });
});

module.exports = router;
