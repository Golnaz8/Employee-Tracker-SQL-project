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
    // TODO: Add MySQL password here
    password: 'Golnaz@1283!',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);


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
        case 'Exit':
          console.log('End of the task! Disconnected from the company_db database.');
          break;
      }
    });
}


function viewAllDepartments() {
  const sql = 'SELECT id, name FROM department';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error viewing all departments', err);
      return;
    }
    console.log(rows);
    init();
  });
}


function viewAllRoles() {
  const sql = 'SELECT id, title FROM role';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error viewing all roles', err);
      return;
    }
    console.log(rows);
    init();
  });
}


function viewAllEmployees() {
  const sql = 'SELECT id, first_name, last_name FROM employee';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error viewing all employees', err);
      return;
    }
    console.log(rows);
    init();
  });
}


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




init();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
