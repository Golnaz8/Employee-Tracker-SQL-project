const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // please Add MySQL password here
    password: 'Golnaz@1283!',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);



// to start the application with the first question and choices then depends on choice a fuction will be called
function init() {
  inquirer
    .prompt({
      type: 'list',
      name: 'start',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Delete an employee',
        'Department utilized budget',
        'Exit',
      ]
    })
    .then(response => {
      console.log(response);
      switch (response.start) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Delete an employee':
          deleteEmployee();
          break;
        case 'Department utilized budget':
          departmentBudget();
          break;
        case 'Exit':
          console.log('End of the task! Disconnected from the company_db database.');
          break;
      }
    });
}



// to view all departments from department table
function viewAllDepartments() {
  const sql = 'SELECT id, name FROM department';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error viewing all departments', err);
      return;
    }
    console.table(rows);
    init();
  });
}

// to view all roles and salaries from role table which is joined with department table
function viewAllRoles() {
  const sql = 'SELECT role.id AS id, role.title AS title, role.salary AS salary, department.name as department FROM department JOIN role ON department.id = role.department_id';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error viewing all roles', err);
      return;
    }
    console.table(rows);
    init();
  });
}



// to view all employees data from employee table which is joined with role and department tables
function viewAllEmployees() {
  const sql = 'SELECT employee.id AS id, employee.first_name AS FName, employee.last_name AS LName, role.title AS title, role.salary AS salary, department.name AS department, CONCAT(manager.first_name," ", manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error viewing all employees', err);
      return;
    }
    console.table(rows);
    init();
  });
}



// to add a department
function addDepartment() {
  inquirer.prompt({
    type: 'inpute',
    name: 'departmentName',
    message: 'What is the name of the department?'
  }).then(response => {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const values = [response.departmentName];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding department:', err);
        return;
      } else {
        console.log('Department added successfully.');
      }
      init();
    });
  });
}



// to add a role
function addRole() {
  const departmentQuery = 'SELECT id, name FROM department';
  db.query(departmentQuery, (err, departments) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return;
    }

    // Map departments to inquirer choices format
    const departmentChoices = departments.map(department => ({
      name: department.name,
      value: department.id
    }));



    inquirer.prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the name of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the role:',
        choices: departmentChoices
      }
    ]).then(response => {
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      const values = [response.roleTitle, response.salary, response.departmentId];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error adding role:', err);
        } else {
          console.log('Role added successfully.');
        }
        init();
      });
    });
  });
}



// to add an employee
function addEmployee() {
  const roleQuery = 'SELECT id, title FROM role';
  db.query(roleQuery, (err, roles) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return;
    }
    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));

    const managerQuery = 'SELECT id, first_name, last_name FROM employee';
    db.query(managerQuery, (err, managers) => {
      if (err) {
        console.error('Error fetching managers:', err);
        return;
      }

      // Map managers to inquirer choices format
      const managerChoices = managers.map(manager => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
      }));

      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the employee first name??'
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the employee last name?'
        },
        {
          type: 'list',
          name: 'employeeRole',
          message: 'What is the employee role?',
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'employeeManager',
          message: 'Who is the employee manager?',
          choices: managerChoices
        }
      ]).then(response => {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const values = [response.firstName, response.lastName, response.employeeRole, response.employeeManager];

        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error adding employee:', err);
          } else {
            console.log('Employee added successfully.');
          }
          init();
        });
      });
    });
  });
}



// to update an employee s role
function updateEmployeeRole() {
  const employeeQuery = 'SELECT id, first_name, last_name FROM employee';
  db.query(employeeQuery, (err, employees) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return;
    }
    // Map employee to inquirer choices format
    const emloyeeChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));

    const roleQuery = 'SELECT id, title FROM role';
    db.query(roleQuery, (err, roles) => {
      if (err) {
        console.error('Error fetching roles:', err);
        return;
      }
      const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
      }));

      const managerQuery = 'SELECT id, first_name, last_name FROM employee';
      db.query(managerQuery, (err, managers) => {
        if (err) {
          console.error('Error fetching managers:', err);
          return;
        }

        // Map managers to inquirer choices format
        const managerChoices = managers.map(manager => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id
        }));



        inquirer.prompt([
          {
            type: 'list',
            name: 'employeeUpdate',
            message: 'Which employee s role do yo want to update?',
            choices: emloyeeChoices
          },
          {
            type: 'list',
            name: 'employeeRole',
            message: 'What would you like the employee s role to be?',
            choices: roleChoices
          },
          {
            type: 'list',
            name: 'employeeManager',
            message: 'Who would you like the employee s manager to be?',
            choices: managerChoices
          }
        ]).then(response => {
          const sql = 'UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?';
          const values = [response.employeeRole, response.employeeManager, response.employeeUpdate];

          db.query(sql, values, (err, result) => {
            if (err) {
              console.error('Error updating employee role:', err);
            } else {
              console.log('Employee role updated successfully.');
            }
            init();
          });
        });
      });
    });
  });
}



// to delete an employee
function deleteEmployee() {
  const employeeQuery = 'SELECT id, first_name, last_name FROM employee';
  db.query(employeeQuery, (err, employees) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return;
    }

    // Map employees to inquirer choices format
    const employeeChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));

    inquirer.prompt({
      type: 'list',
      name: 'employeeName',
      message: 'What is the name of the employee?',
      choices: employeeChoices
    }).then(response => {
      const sql = 'DELETE FROM employee WHERE id = ?';
      const values = [response.employeeName];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error deleting employee:', err);
          return;
        } else {
          console.log('Employee deleted successfully.');
        }
        init();
      });
    });
  });
}



// to view a department total utilized budget
function departmentBudget() {
  const departmentQuery = 'SELECT id, name FROM department';
  db.query(departmentQuery, (err, departments) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return;
    }

    // Map departments to inquirer choices format
    const departmentChoices = departments.map(department => ({
      name: department.name,
      value: department.id
    }));


    inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department:',
        choices: departmentChoices
      }
    ]).then(response => {
      const sql = 'SELECT SUM(role.salary) FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?';
      const values = [response.departmentId];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error adding salaries:', err);
        } else {
          console.log(result);
        }
        init();
      });
    });
  });

}


// to start 
init();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
