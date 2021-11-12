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
  
db.query('SELECT * FROM students', function (err, results) {
    console.log(results);
});