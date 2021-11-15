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

function runQuery(query,values) {

  switch(query) {
    case "vad":
      db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
      });
      break;
    
    case "var":
      db.query(`SELECT role.id, title, salary, department_name 
                FROM role JOIN department ON role.department_id = department.id`,
       function (err, results) {
        console.table(results);
      });
      break;

    case "vae":
      db.query(`SELECT emp.id, emp.first_name, emp.last_name, title, salary, department_name, emp2.id AS "manager_id", 
                CONCAT(emp2.first_name, ' ', emp2.last_name) AS "manager_name" FROM employee AS emp
                JOIN role ON emp.role_id = role.id
                JOIN department ON role.department_id = department.id 
                LEFT JOIN employee AS emp2 ON emp.manager_id = emp2.id;`, 
        function (err, results) {
          console.table(results);
      });
      break;

    case "aad":
      db.query(`INSERT INTO department(department_name) VALUES (?)`, values, function (err) {
        if (err) {
          console.log(err);
        }
      });
      runQuery("vad")
      break;

    case "aar":
      let title = values[0]
      let salary = values[1]
      let id = values[2]

      db.query(`INSERT INTO role (title, salary, department_id)
                VALUES (?,?,?)`, [title, salary, id], function (err) {
        if (err) {
          console.log(err);
        }
      });
      runQuery("var")
      break;

    case "aae":
      break;

    case "uaer":
      break;
  }
}

module.exports = runQuery