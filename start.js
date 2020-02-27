const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table")

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",


  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  //Making sure we're calling our runSearch function ONLY AFTER our connection to the database was successfully established
  console.log("Sweeeet! You are connected as id " + connection.threadId + "\n");
  startApp();
});

function startApp() {
  //Run an inquirer prompt to ask for the user's desired action
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View employees",
        "View departments",
        "View roles",
        "Add employees",
        "Add departments",
        "Add roles",
        "Update employee roles",
        "Remove an employee"
      ]
    })
    .then(answer => {
      //Based on the selected action, call one of our functions to query the database
      switch (answer.action) {
        case "View employees":
          viewEmp();
          break;

        case "View departments":
          // viewDeps();
          break;

        case "View roles":
          // viewRoles();
          break;

        case "Add employees":
          // addEmp();
          break;

        case "Add departments":
          // addDeps();
          break;

        case "Add roles":
          // addRoles();
          break;

        case "Update employee roles":
          // updateRoles();
          break;
          
        case "Remove an employee":
          // removeEmp();
          break;
      }
    });
}

function viewEmp () {
  console.log("Selecting all employees info...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
  });
}