// src/middleware/validateCourse.js
const { body, validationResult } = require('express-validator');

const courseValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Course name is required'),
  body('duration')
    .notEmpty()
    .withMessage('Duration is required')
];

const validateCourse = [
  ...courseValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return the first validation error message
      const firstError = errors.array()[0];
      return res.status(400).json({ error: firstError.msg });
    }

    next();
  }
];

module.exports = validateCourse;
