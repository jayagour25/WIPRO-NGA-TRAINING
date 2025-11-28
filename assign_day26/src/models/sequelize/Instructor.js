const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

const Instructor = sequelize.define(
  'Instructor',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: 'instructors',
  }
);

module.exports = Instructor;
