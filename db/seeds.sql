SET FOREIGN_KEY_CHECKS=0;

INSERT INTO department (department_name)
VALUES
    ("Web Debelopment"),
    ("Accounting"),
    ("Management");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Engineer", 79000, 1),
    ("Secretary", 49000, 2),
    ("CEO", 99000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Sally", "Smith", 1, 3),
    ("Bill", "Black", 2, 3),
    ("Jack", "Johnson", 3, null);

SELECT emp.id, emp.first_name, emp.last_name, emp2.id AS "manager id", emp2.first_name AS "manager name" FROM employee AS emp
JOIN employee AS emp2 ON emp.manager_id = emp2.id

-- SELECT employee.id, first_name AS "first name", last_name AS "last name", title, salary, department_name AS "department", manager_id AS "manager id"
-- FROM employee
-- JOIN role ON employee.role_id = role.id
-- JOIN department ON role.department_id = department.id
