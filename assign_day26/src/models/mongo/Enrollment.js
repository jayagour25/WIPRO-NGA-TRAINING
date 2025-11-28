// src/models/mongo/Enrollment.js
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseTitle: { type: String, required: true },  // simple for demo
  enrolledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
