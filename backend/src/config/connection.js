const dotenv = require('dotenv').config({ path: './src/.env' })
const { Sequelize } = require('sequelize');

const sq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIAL,
  logging: false,
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  ssl: true
  // pool: {
  //   max: 100,
  //   min: 0,
  //   idle: 10000,
  //   acquire: 60000,
  // },
  // timezone: '+07:00'
});

async function tes() {
  try {
    await sq.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
tes()
module.exports = { sq }
