# SQL Project: Employee Tracker

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. In this project I am trying to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role, Delete an employee, and Department utilized budget
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
WHEN I choose to delete an employee
THEN I am prompted to select the employee and that employee is deleted from database
WHEN I choose to department utilized budget
THEN I am prompted to select a department and the combined salaries of all employees in that department will be shown in terminal
```

## Mock-Up

The following walkthrough video, demonstrates aaplication's functionality:
https://drive.google.com/file/d/1WidFSr-YK1gkDlHTPZMcw1t7rkli1Q41/view


## Installation

To install necessary dependencies, run the following command:

npm i
npm install express@4.17.1
npm install inquirer@8.2.4
npm install mysql2@2.2.5

## Questions
If you have any question, feel free to contact through this email address: golnaz.brj@gmail.com

---

© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
