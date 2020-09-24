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
    // {
    //     type:"input",
    //     name: "roles",
    //     message:"What role would you like to add?",
    // }, 
    // {
    //     type:"list",
    //     name: "employees",
    //     message:"Would you like to add an employee?",
    //     choices: [
    //         "Yes",
    //         "No"
    //     ]
    // },
    // {
    //     type:"list",
    //     name: "view",
    //     message:"What would you like to see?",
    //     choices: [
    //         "Departments",
    //         "Roles",
    //         "Employees"
    //     ]
    // },
    // {
    //     type:"input",
    //     name: "update",
    //     message:"What would you like to update?",
    // },
    // ]);