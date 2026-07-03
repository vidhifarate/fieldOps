const {config}= require('dotenv')
config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  // "test": {
  //   "username": "postgres",
  //   "password": "coditas@123",
  //   "database": "trello",
  //   "host": "127.0.0.1",
  //   "dialect": "postgres"
  // },
  // "production": {
  //   "username": "postgres",
  //   "password": "coditas@123",
  //   "database": "trello",
  //   "host": "127.0.0.1",
  //   "dialect": "postgres"
  // }
}
