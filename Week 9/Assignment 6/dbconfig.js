const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10, 
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_imm',
  password        : '6z7PZ6Z$OdPeHGjf2ToH',
  database        : 'cs290_imm'
});
module.exports.pool = pool;