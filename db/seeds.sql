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
