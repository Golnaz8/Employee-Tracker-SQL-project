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
  inquirer.prompt ({
    type: 'inpute',
    name: 'departmentName',
    message: 'What is the name of the department?'
  })    .then(response => {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const values = [response.departmentName];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding department:', err);
        return;
      } else {
        console.log('Department added successfully.');
        console.log(result);
      }
      init();
    });
  });
}


function addRole() {
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
    // {
    //   type: 'input',
    //   name: 'roleDepartment',
    //   message: 'Which department does the role belong to?'
    // }

  ]).then(response => {
    const sql = 'INSERT INTO role (title, salary) VALUES (?, ?)';
    const values = [response.roleTitle, response.salary];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding role:', err);
      } else {
        console.log('Role added successfully.');
        console.log(result);
      }
      init();
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
