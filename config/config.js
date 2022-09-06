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
    username: 'b66e39849f4252',
    password: "18ce2e22",
    database: "heroku_900f3028c55dfd8",
    host: "us-cdbr-east-06.cleardb.net",
    dialect: 'mysql',
  },
};
