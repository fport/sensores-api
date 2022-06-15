// Import mysql
const mysql = require("mysql");

// Import dotenv
require("dotenv").config();

const { HOST, USERDB, PASSWORD, DB, CONNECTIONLIMIT, DBPORT } = process.env;

//For mysql db connection
const dbConn = mysql.createPool({
  connectionLimit: CONNECTIONLIMIT,
  host: HOST,
  user: USERDB,
  password: PASSWORD,
  database: DB,
  port: DBPORT,
  debug: false,
});

module.exports = dbConn;
