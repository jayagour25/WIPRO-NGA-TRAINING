// src/index.js
const express = require('express');
const dotenv = require('dotenv');
const connectMongo = require('./config/mongo');
const { sequelize, testSequelize } = require('./config/sequelize');

// Sequelize models & associations
const Instructor = require('./models/sequelize/Instructor');
const Course = require('./models/sequelize/Course');

// Routes
const mysqlRoutes = require('./routes/mysqlRoutes');
const mongoRoutes = require('./routes/mongoRoutes');
const sequelizeRoutes = require('./routes/sequelizeRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

// Test DB connections on startup
connectMongo();
testSequelize();

// Define Sequelize associations (One-to-Many: Instructor -> Courses)
Instructor.hasMany(Course, { foreignKey: 'InstructorId' });
Course.belongsTo(Instructor, { foreignKey: 'InstructorId' });

// Sync Sequelize models with DB (for dev/demo only)
sequelize
  .sync()
  .then(() => {
    console.log('Sequelize models synchronized with database');
  })
  .catch((err) => {
    console.error('Sequelize sync error:', err.message);
  });

// Simple health check
app.get('/', (req, res) => {
  res.send('SkillSphere Day 26 - Database Connectivity API is running');
});

// Route mounting
app.use('/mysql', mysqlRoutes);
app.use('/mongo', mongoRoutes);
app.use('/sequelize', sequelizeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
