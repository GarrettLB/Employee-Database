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
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    }
  )
  .then((response) => {

    switch(response.menu) {
        case "view all departments":
            runQuery("vad")
            break;
        
        case "view all roles":
            runQuery("var")
            break;

        case "vae":
            runQuery("vae")
            break;

        case "aad":
            runQuery("aad")
            break;

        case "aar":
            runQuery("aar")
            break;

        case "aae":
            runQuery("aae")
            break;

        case "uaer":
            runQuery("uaer")
            break;
    }
  })
