// src/routes/sequelizeRoutes.js
const express = require('express');
const Instructor = require('../models/sequelize/Instructor');
const Course = require('../models/sequelize/Course');

const router = express.Router();

// Seed some data: POST /sequelize/seed
router.post('/seed', async (req, res) => {
  try {
    const instructor = await Instructor.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
    });

    const course1 = await Course.create({
      title: 'Advanced Node.js',
      description: 'Deep dive into Node.js internals',
      InstructorId: instructor.id,
    });

    const course2 = await Course.create({
      title: 'Express.js Mastery',
      description: 'Building robust APIs with Express',
      InstructorId: instructor.id,
    });

    res.json({
      message: 'Seeded instructor and courses via Sequelize',
      instructor,
      courses: [course1, course2],
    });
  } catch (err) {
    console.error('Sequelize seed error:', err);
    res.status(500).json({ error: 'Sequelize seeding failed', details: err.message });
  }
});

// GET /sequelize/instructors/:id/courses
router.get('/instructors/:id/courses', async (req, res) => {
  try {
    const instructorId = req.params.id;

    const instructor = await Instructor.findByPk(instructorId, {
      include: Course,
    });

    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    res.json({
      message: 'Courses fetched for instructor',
      instructor: {
        id: instructor.id,
        name: instructor.name,
        email: instructor.email,
      },
      courses: instructor.SequelizeCourses,
    });
  } catch (err) {
    console.error('Sequelize query error:', err);
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
});

module.exports = router;
