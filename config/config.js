require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_HOST,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'some_databate',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MAIN_DB_USER,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.MAIN_DB_HOST,
    dialect: 'mysql',
  },
};
