const mysql = require("mysql");
const inquirer = require("inquirer");
//const console = require("console.table");

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

    })
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
function addEmployee() {
    inquirer.prompt([
        {
            type:"input",
            name: "add employee",
            message:"What employee would you like to add?",
        }
    ]).then(function(answers){  
           
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

}
function updateRoles() {

}