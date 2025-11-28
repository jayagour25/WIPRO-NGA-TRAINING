// src/routes/mongoRoutes.js
const express = require('express');
const User = require('../models/mongo/User');
const Enrollment = require('../models/mongo/Enrollment');

const router = express.Router();

// Seed sample data (for demo): POST /mongo/seed
router.post('/seed', async (req, res) => {
  try {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
    });
    await user.save();

    const enrollment = new Enrollment({
      user: user._id,
      courseTitle: 'Node.js Basics',
    });
    await enrollment.save();

    res.json({ message: 'Seeded sample user and enrollment', user, enrollment });
  } catch (err) {
    console.error('MongoDB seed error:', err);
    res.status(500).json({ error: 'Seeding failed', details: err.message });
  }
});

// GET /mongo/enrollments
router.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('user', 'name email')
      .exec();

    res.json({
      message: 'Enrollment details fetched successfully',
      data: enrollments,
    });
  } catch (err) {
    console.error('MongoDB fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch enrollments', details: err.message });
  }
});

module.exports = router;
