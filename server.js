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
          'exit',
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
            // function
            break;
          case 'Add a department':
            // function
            break;
          case 'Add a role':
            // function
            break;
          case 'Add an employee':
            // function
            break;
          case 'Update an employee role':
            // function
            break;
          case 'Exit':
            db.end();
            console.log('Disconnected from MySQL database');
            break;
        }
    });
}


function viewAllDepartments() {
    const sql = 'SELECT id, name FROM department';
    db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
           return;
        }
        res.json({
          message: 'success',
          data: rows
        });
        init();
      });
}


function viewAllRoles() {

}

init();
