const courses = require("../data/coursesData");

exports.getAllCourses = (req, res) => {
  return res.status(200).json(courses);
};

exports.getCourseById = (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  return res.status(200).json(course);
};
