// src/config/sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.SEQUELIZE_DB,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect: process.env.SEQUELIZE_DIALECT,
    logging: false,
  }
);

async function testSequelize() {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connected to MySQL');
  } catch (err) {
    console.error('Sequelize connection error:', err.message);
  }
}

module.exports = { sequelize, testSequelize };
