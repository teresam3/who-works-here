const mysql = require("mysql");
const inquirer = require("inquirer");
const console = require("console.table");

function askEmployees() {
    inquirer.prompt([
    {
        type:"input",
        name: "department type",
        message:"What department would you like to add?",
    },
    {
        type:"input",
        name: "roles",
        message:"What role would you like to add?",
    }, 
    {
        type:"input",
        name: "employees",
        message:"Would you like to add an employee?",
    },
    {
        type:"choices",
        name: "view",
        message:"What would you like to see?",
        choices: [
            "Departments",
            "Roles",
            "Employees"
        ]
    },
    {
        type:"input",
        name: "update",
        message:"What would you like to update?",
    },
    ])
};