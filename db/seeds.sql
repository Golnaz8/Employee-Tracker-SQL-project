INSERT INTO department (name) VALUES
    ('HR'),
    ('Finance'),
    ('Marketing'),
    ('IT'),
    ('Operations');


INSERT INTO role (title, salary, department_id) VALUES
    ('Company Manager', 100000.00, 5),
    ('HR Manager', 70000.00, 1),
    ('Accountant', 55000.00, 2),
    ('Marketing Specialist', 60000.00, 3),
    ('Software Engineer', 80000.00, 4);  


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Ethan', 'Smith', 1, 1),
    ('Olivia', 'Johnson', 2, 2),
    ('Liam', 'Tremblay', 3, NULL),
    ('Emma', 'Li', 3, NULL),
    ('Lucas', 'Wong', 4, NULL),
    ('Ava', 'Dubois', 4, NULL),
    ('Noah', 'Patel', 4, NULL),
    ('Sophia', 'Garcia', 5, NULL),
    ('Isabella', 'Martinez', 5, NULL);
    