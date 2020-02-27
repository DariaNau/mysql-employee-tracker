const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table")

const connection = mysql.createConnection({
  host: "localhostDB",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  password: "Finnycat1206!",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  //Make sure we're calling our runSearch function ONLY AFTER our connection to the database was successfully establishe
  runSearch();
});

function runSearch() {
  //Run an inquirer prompt to ask for the user's desired action
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song",
        "Find artists with a top song and top album in the same year"
      ]
    })
    // .then(answer => {
    //   //Based on the selected action, call one of our functions to query the database
    //   switch (answer.action) {
    //     case "Find songs by artist":
    //       artistSearch();
    //       break;

    //     case "Find all artists who appear more than once":
    //       multiSearch();
    //       break;

    //     case "Find data within a specific range":
    //       rangeSearch();
    //       break;

    //     case "Search for a specific song":
    //       songSearch();
    //       break;

    //     case "Find artists with a top song and top album in the same year":
    //       songAndAlbumSearch();
    //       break;
    //   }
    // });
}
