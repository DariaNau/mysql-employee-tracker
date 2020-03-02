const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table")
const Employee = require("./lib/Employee");
const ORM = require("./lib/Queries");
const db = new ORM();

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password!
  password: "",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  //Making sure we're calling our runSearch function ONLY AFTER our connection to the database was successfully established
  console.log("You are connected as id " + connection.threadId + "\n");
  startApp();
});

function startApp() {
  //Run an inquirer prompt to ask for the user's desired action
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        new inquirer.Separator(),
        "View employees",
        "View departments",
        "View roles",
        new inquirer.Separator(),
        "Add employees",
        "Add departments",
        "Add roles",
        new inquirer.Separator(),
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
          viewDeps();
          break;

        case "View roles":
          viewRoles();
          break;

        case "Add employees":
          addEmp();
          break;

        case "Add departments":
          addDeps();
          break;

        case "Add roles":
          addRoles();
          break;

        case "Update employee roles":
          updateRoles();
          break;

        case "Remove an employee":
          // removeEmp();
          break;
      }
    });
}

function viewEmp() {
  // console.log("Selecting all employees info...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    startApp();
  });
}

function viewDeps() {
  console.log("Selecting all departments info...\n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    startApp();
  });
}

function viewRoles() {
  console.log("Selecting roles info...\n");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    startApp();
  });
}

function addEmp() {
  console.log("Please enter the following information: \n");
  inquirer
    .prompt([{
      name: "name",
      type: "input",
      message: "Enter employee's first name: "
    },
    {
      name: "lastname",
      type: "input",
      message: "Enter employee's last name: "
    },
    {
      name: "role",
      type: "number",
      message: "Enter employee's role id: "
    },
    {
      name: "manager",
      type: "number",
      message: "Enter employee's manager id: "
    }
    ])
    .then(answer => {
      const employee = new Employee("", answer.name, answer.lastname, answer.role, answer.manager);
      db.insertEmployee(connection, employee);
      viewEmp();
    })
};

function addDeps() { 
  console.log("Please enter the following information: \n");
  inquirer
    .prompt([{
      name: "name",
      type: "input",
      message: "Enter departments's name: "
    }])
    .then(answer => {
      const query = connection.query(
        "INSERT INTO department SET ?", {
            name: answer.name,
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " new department inserted!\n");
        });
      viewDeps();
    });
};

function addRoles() { 
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    const departmentRows = res;
    console.table(res);
  console.log("Please enter the following information: \n");
  inquirer
    .prompt([{
      name: "title",
      type: "input",
      message: "Enter new role's title: "
    },
    {
      name: "salary",
      type: "number",
      message: "Enter new role's salary"
    },
    {
      name: "dep",
      type: "list",
      message: "Please select the department",
      choices:departmentRows.map(row => `${row.id} ${row.name}`)
    }
  ])
    .then(answer => {
      const depId = answer.dep[0];
      connection.query(
        "INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: depId
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " new role inserted!\n");
        });
      viewRoles();
    });
  });
};


function updateRoles() {
  //go ahead and query first, then we can run our propmt when we get results
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    const employeeRows = res;
    console.table(res);
    inquirer.prompt({
        name: "employee",
        type: "list",
        message: "Please select employee to update",
        choices: employeeRows.map(row => `${row.id} ${row.first_name} ${row.last_name}`)
      })
      .then(answers => {
        const empId = answers.employee[0];
        console.log("Selected employee ID is ", empId);
        //do the same thing we did above: select all roles, then display a list of inquirer choices
        connection.query(`
        SELECT employee.id, employee.First_name, employee.last_name, employee.role_id, role.title 
        FROM employee, role 
        WHERE role.id = employee.role_id
        AND employee.id = ${empId}
        `, function (err, res) {
          if (err) throw err;
          console.table(res);
          inquirer.prompt({
              name: "role",
              type: "input",
              message: "Please enter a new role id",
            })
            .then(answer => {
              connection.query("UPDATE employee SET ? WHERE ?",
                [{
                    role_id: answer.role
                  },
                  {
                    id: empId
                  }
                ],
                function (err, res) {
                  if (err) throw err;
                  // show updated employee table
                  console.log(res.affectedRows + " role is updated!\n");
                  startApp();
                });
            });
        });
      });
  });
};


