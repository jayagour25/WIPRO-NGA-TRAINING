const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

const Course = sequelize.define(
  'SequelizeCourse',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    InstructorId: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false,
    tableName: 'sequelize_courses',
  }
);

module.exports = Course;
