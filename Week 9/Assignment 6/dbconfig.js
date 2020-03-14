const mysql = require('mysql');
const pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

module.exports.pool = pool;