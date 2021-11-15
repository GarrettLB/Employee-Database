const cTable = require("console.table")
const inq = require("inquirer")
const mysql = require("mysql2")
const runQuery = require("./assets/query")
const query = require("./assets/query")

inq
  .prompt(
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'menu',
      choices: ["view all departments", "view all roles", "view all employees", "add a department", 
                "add a role", "add an employee", "update an employee role"]
    }
  )
  .then((res) => {

    switch(res.menu) {
        case "view all departments":
            runQuery("vad")
            break;
        
        case "view all roles":
            runQuery("var")
            break;

        case "view all employees":
            runQuery("vae")
            break;

        case "add a department":
            inq
            .prompt({
              type: 'input',
              message: 'Enter department name.',
              name: 'department'
            })
            .then(res => {
              let value = res.department
              runQuery("aad",value)
            })
            break;

        case "add a role":
          runQuery("aar")
          break;

        case "add an employee":
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
                type: 'input',
                message: "Enter employee's role id. (references role table)",
                name: 'roleid'
              },
              {
                type: 'input',
                message: "Enter employee's manager's id. (leave blank if no manager)",
                name: 'managerid'
              }
            ])
            .then(res => {
              let value = [res.fname, res.lname, res.roleid,res.managerid]
              runQuery("aae",value)
            })
            break;

        case "update an employee role":
            runQuery("uaer")
            break;
    }
  })
