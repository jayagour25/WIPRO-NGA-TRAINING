// src/routes/mysqlRoutes.js
const express = require('express');
const pool = require('../config/mysql');

const router = express.Router();

// POST /mysql/courses
router.post('/courses', async (req, res) => {
  try {
    const { title, description, level } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO courses (title, description, level) VALUES (?, ?, ?)',
      [title, description, level]
    );

    console.log('✅ INSERT INTO courses successful, id =', result.insertId);
    res.status(201).json({
      message: 'Course inserted successfully via MySQL',
      courseId: result.insertId,
    });
  } catch (err) {
    console.error('❌ MySQL insert error:', err);
    res.status(500).json({ error: 'MySQL insert failed', details: err.message });
  }
});

module.exports = router;
