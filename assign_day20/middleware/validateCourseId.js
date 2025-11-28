// middleware/validateCourseId.js

function validateCourseId(req, res, next) {
  const { id } = req.params;

  // Check if id is numeric
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  // If valid → continue to main route handler
  next();
}

module.exports = validateCourseId;
