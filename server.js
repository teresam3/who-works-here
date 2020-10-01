const mysql = require("mysql");
const inquirer = require("inquirer");
//const console = require("console.table");
const util = require('util');
const { waitForDebugger } = require("inspector");

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

//first inquirer prompt
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
            name: "add department",
            message:"What department would you like to add?",
        }
    ]).then(function(answers){  
        connection.query("INSERT INTO departments", function(err, result) {
                if (err) throw err;
        console.log("added a department!")
    });
});
}
function addRole() {
    inquirer.prompt([
        {
            type:"input",
            name: "add role",
            message:"What role would you like to add?",
        }
    ]).then(function(answers){  
           
    })
}
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
        connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
            [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.managerId], 
            function(err, result) {
                if (err) throw err;

        });
    })
}
function viewDepartment() {
    //how to VIEW data
}
function viewRoles() {
    //how to VIEW data
} 
function viewEmployees() {
    //how to VIEW data
}
function updateEmployees() {
//     UPDATE [LOW_PRIORITY] [IGNORE] table_name 
// SET 
//     column_name1 = expr1,
//     column_name2 = expr2,
//     ...
// [WHERE
//     condition];
}
function updateRoles() {

}