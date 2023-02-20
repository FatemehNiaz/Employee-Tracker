const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "13621362",
  database: "employee_tracker"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
