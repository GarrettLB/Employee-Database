const mysql = require("mysql2")
const cTable = require("console.table");
const { json } = require("express");
const inq = require("inquirer")

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'employees_db'
  }
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
      db.query(`SELECT emp.id, emp.first_name, emp.last_name, title, salary, department_name, 
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
      db.query('SELECT department_name FROM department', function (err, results) {
        let departments = []

        for (let i of results) {
          departments.push(i.department_name)
        }

        inq
          .prompt([
            {
              type: 'input',
              message: 'Enter role title.',
              name: 'title'
            },
            {
              type: 'input',
              message: 'Enter role salary.',
              name: 'salary'
            },
            {
              type: 'list',
              message: 'Choose department.',
              name: "department",
              choices: departments
            }
          ])
          .then(res => {
            const {title, salary, department} = res
 
            db.query(`SELECT id FROM department WHERE department_name = ?`, department, function (err, res) {
              if (err) {
                console.log(err);
              }

              let dptId = res[0].id
        
              db.query(`INSERT INTO role (title, salary, department_id)
                        VALUES (?,?,?)`, [title, salary, dptId], function (err) {
                if (err) {
                  console.log(err);
                }
                runQuery("var")
              });
            });
          })
      });
      break;

    case "aae":
      db.query('SELECT title FROM role', function (err, results) {
        let roles = []

        for (let i of results) {
          roles.push(i.title)
        }

        db.query("SELECT CONCAT(first_name, ' ', last_name) AS 'manager_name' FROM employee", function (err, results) {
          let employees = []
  
          for (let i of results) {
            employees.push(i.manager_name)
          }
          employees.push("none")

          inq
            .prompt([
            {
              type: 'input',
              message: "Enter employee's first name.",
              name: 'fname'
            },
            {
              type: 'input',
              message: "Enter employee's last name.",
              name: 'lname'
            },
            {
              type: 'list',
              message: "Choose employee's role.",
              name: 'role',
              choices: roles
            },
            {
              type: 'list',
              message: "Choose employee's manager.",
              name: 'manager',
              choices: employees
            }
            ])
            .then(res => {
              const {fname, lname, role, manager} = res

              db.query(`SELECT id FROM role WHERE title = ?`, role, function (err, res) {
                if (err) {
                  console.log(err);
                }
  
                let roleId = res[0].id
                
                if (manager === "none"){
                  var managerId = null
                  
                  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?,?,?,?)`, [fname, lname, roleId, managerId], function (err) {
                    if (err) {
                      console.log(err);
                    }

                    runQuery("vae")
                  })
                } else {
                  let split = manager.split(" ")

                  db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, [split[0], split[1]], function (err, res) {
                    if (err) {
                      console.log(err);
                    }
      
                    let managerId = res[0].id
                    
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                              VALUES (?,?,?,?)`, [fname, lname, roleId, managerId], function (err) {
                      if (err) {
                        console.log(err);
                      }

                      runQuery("vae")
                    })
                  })
                }
              })
            })
          })
        })     
      break;

    case "uaer":
      break;
  }
}

module.exports = runQuery