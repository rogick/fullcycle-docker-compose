const mysql = require('mysql');

module.exports = function() {
  return mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle'
  });
};
