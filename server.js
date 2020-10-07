//dependecies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const util = require('util');
const { waitForDebugger } = require("inspector");

//established credentials to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "chilimango",
    database: "employee_db"
  });
  
// Initiate MySQL Connection.
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

//initial inquirer prompt
inquirer.prompt([
    {
        type:"list",
        name: "userChoice",
        message:"What would you like to add a department?",
        choices: [
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "View Department",
            "View Roles",
            "View Employees",
            "Update Employees",
            "Update Roles"
        ]
    }
//switch statement that will lead into the next action
]).then(function(answers){
        console.log(answers)
        switch (answers.userChoice) {
            case "Add a Department": 
               addDepartment() 
               break;
            case "Add a Role":
                addRole()
                break;
            case "Add an Employee":
                addEmployee()
                break;
            case "View Department":
                viewDepartment()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "Update Employees":
                updateEmployees()
                break;
            case "Update Roles":
                updateRoles()
                break;
        }
    });
function addDepartment() {
    inquirer.prompt([
        {
            type:"input",
            name: "addDepartment",
            message:"What department would you like to add?",
        }
    ]).then(function(answers){  
        connection.query("INSERT INTO departments (title) VALUES (?)",
        [answers.addDepartment], 
        function(err, result) {
            if (err) throw err;
        console.log("added a department!");   
        });
    });
};
async function addRole() {
    const query = (sql, args) => util.promisify(connection.query).call(connection, sql, args);
    const departments = await query("SELECT * FROM departments")
    inquirer.prompt([
        {
            type:"input",
            name: "addRole",
            message:"What role would you like to add?",
        },
        {
            type:"input",
            name: "addSalary",
            message:"What is their salary?",
        },
        {
            type:"list",
            name: "addDepId",
            message:"What is their Department?",
            choices: departments.map((department) => {return department.name}),
        }
    ]).then(function(answers){
        console.log("Department array", departments)
        const depId = departments.find((department)=> {
            console.log("Each department", department.name)
            return department.name === answers.addDepId
        }).id
        console.log("Found department", depId)
        connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [answers.addRole, answers.addSalary, depId], 
        function(err, result) {
            if (err) throw err;
        console.log("added a role!"); 
    });
});
};
async function addEmployee() {
    const query = (sql, args) => util.promisify(connection.query).call(connection, sql, args);
    const roles = await query("SELECT * FROM roles")
    console.table(roles)
    inquirer.prompt([
        {
            type:"input",
            name: "employeeFirstName",
            message:"What is the first name of the employee?",
        },
        {
            type:"input",
            name: "employeeLastName",
            message:"What is the last name of the employee?",
        },
        {
            type:"list",
            name: "employeeRole",
            message:"What is the role of the employee?",
            choices: roles.map((role) => {return role.title})
        },
        {
            type:"input",
            name: "managerId",
            message:"Who is the manager of the employee?"
        }
    ]).then(function(answers){  
        connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.managerId], 
            function(err, result) {
                if (err) throw err;
            console.log("added an employee!")
        });
    })
};

async function viewDepartment() {
    const query = (sql, args) => util.promisify(connection.query).call(connection, sql, args);
    const departments = await query("SELECT * FROM departments")
    console.log("Here are the departments!");
    console.table(departments);
};

async function viewRoles() {
    const query = (sql, args) => util.promisify(connection.query).call(connection, sql, args);
    const roles = await query("SELECT * FROM roles")
    console.log("Here are the roles!");
    console.table(roles);
};

async function viewEmployees() {
    const query = (sql, args) => util.promisify(connection.query).call(connection, sql, args);
    const employees = await query("SELECT * FROM employees")
    console.log("Here are the employeees!");
    console.table(employees);
};

async function updateEmployees() {
    const query = (sql, args) => util.promisify(connection.query).call(connection, sql, args);
    const roles = await query("SELECT * FROM roles");
    const employees = await query("SELECT * FROM employees")
    console.log(employees)
    inquirer.prompt([
        {
            type:"input",
            name: "updateFirstName",
            message:"What is the first name of the employee?",
        },
        {
            type:"input",
            name: "updateLastName",
            message:"What is the last name of the employee?",
        },
        {
            type:"list",
            name: "updateEmployeeRole",
            message:"What is the role of the employee?",
            choices: roles.map((role) => {return role.title})
        },
        {
            type:"list",
            name: "updateManagerId",
            message:"Who is the manager of the employee?",
            choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`)
        },
    ]).then(function(answers){  
            connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [answers.updateFirstName, answers.updateLastName, answers.updateEmployeeRole, answers.updateManagerId], 
                function(err, result) {
                    if (err) throw err;
                console.log("updated an employee!")
            });
//     UPDATE table_name 
// SET 
//     column_name1 = expr1,
//     column_name2 = expr2,
//     ...
// [WHERE
//     condition];
})
};

function updateRoles() {
    const query = (sql, args) => util.promisify(connection.query).call(connection, sql, args);
    const roles = query("UPDATE roles SET ") 
};