const mysql = require("mysql2")
const cTable = require("console.table")

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

  switch(query) {
    case "vad":
      db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
      });
      break;
    
    case "var":
      db.query('SELECT role.id, title, salary, department_name AS "department" FROM role JOIN department ON role.department_id = department.id', function (err, results) {
        console.table(results);
      });
      break;

    case "vae":
      break;

    case "aad":
      break;

    case "aar":
      break;

    case "aae":
      break;

    case "uaer":
      break;
  }
}

module.exports = runQuery