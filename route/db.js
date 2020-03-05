const mysql = require('mysql');


var connection = mysql.createConnection({
  host: "mysql-development",
  user: "root",
  password: "12345678",
  database: "tiger"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;