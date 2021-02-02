const { Pool } = require("pg");

const { DBUSER, DBHOST, DBNAME, DBPASS, DBPORT } = process.env;

console.log(DBUSER, DBHOST, DBNAME, DBPASS, DBPORT);

const pool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASS,
  port: DBPORT,
});

module.exports = pool;
