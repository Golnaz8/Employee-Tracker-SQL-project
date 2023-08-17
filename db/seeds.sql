INSERT INTO department (name) VALUES
    ('HR'),
    ('Finance'),
    ('Marketing'),
    ('IT'),
    ('Management');


INSERT INTO role (title, salary, department_id) VALUES
    ('Company Manager', 100000.00, 5),
    ('HR Manager', 70000.00, 1),
    ('Accountant', 55000.00, 2),
    ('Marketing Specialist', 60000.00, 3),
    ('Software Engineer', 80000.00, 4), 
    ('IT manager', 95000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Ethan', 'Smith', 1, NULL),
    ('Olivia', 'Johnson', 2, 1),
    ('Liam', 'Tremblay', 3, 1),
    ('Emma', 'Li', 3, 1),
    ('Lucas', 'Wong', 4, 2),
    ('Ava', 'Dubois', 4, 2),
    ('Noah', 'Patel', 6, 1),
    ('Sophia', 'Garcia', 5, 7),
    ('Isabella', 'Martinez', 5, 7);
    
    