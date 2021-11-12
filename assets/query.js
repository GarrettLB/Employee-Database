const mysql = require("mysql2")

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'employees_db'
  },
  console.log(`Connected to employees_db.`)
);

function runQuery(query) {
  if (query === "vad") {
    db.query('SELECT * FROM department', function (err, results) {
      console.log(results);
    });
  }
}

module.exports = runQuery