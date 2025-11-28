// src/routes/courses.js
const express = require('express');
const validateCourse = require('../middleware/validateCourse');

const router = express.Router();

// In-memory course store (Challenge 1)
let courses = [
  { id: 1, name: 'Node.js Basics', duration: '4 weeks' },
  { id: 2, name: 'REST APIs 101', duration: '3 weeks' }
];
let nextId = 3;

// @route   GET /api/v1/courses
// @desc    Get all courses
router.get('/', (req, res) => {
  res.json(courses);
});

// @route   GET /api/v1/courses/:id
// @desc    Get a single course by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  res.json(course);
});

// @route   POST /api/v1/courses
// @desc    Create a new course
router.post('/', validateCourse, (req, res) => {
  const { name, duration } = req.body;

  const newCourse = {
    id: nextId++,
    name,
    duration
  };

  courses.push(newCourse);

  res.status(201).json(newCourse);
});

// @route   PUT /api/v1/courses/:id
// @desc    Update an existing course
router.put('/:id', validateCourse, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const courseIndex = courses.findIndex(c => c.id === id);

  if (courseIndex === -1) {
    return res.status(404).json({ error: 'Course not found' });
  }

  const { name, duration } = req.body;

  const updatedCourse = { ...courses[courseIndex], name, duration };
  courses[courseIndex] = updatedCourse;

  res.json(updatedCourse);
});

// @route   DELETE /api/v1/courses/:id
// @desc    Delete a course
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const courseIndex = courses.findIndex(c => c.id === id);

  if (courseIndex === -1) {
    return res.status(404).json({ error: 'Course not found' });
  }

  const deletedCourse = courses[courseIndex];
  courses.splice(courseIndex, 1);

  res.json({ message: 'Course deleted', course: deletedCourse });
});

module.exports = router;
