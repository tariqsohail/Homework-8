const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employeeArr = [];

newManager();

function newManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "Enter your manager's name",
      },
      {
        type: "input",
        name: "managerID",
        message: "Enter your manager's ID",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Enter your manager's email address",
      },
      {
        type: "input",
        name: "managerOffice",
        message: "Enter your manager's office number",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerID,
        answers.managerEmail,
        answers.managerOffice
      );
      employeeArr.push(manager);
      newEmployee();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

function newEmployee() {
  inquirer
    .prompt([
      {
        message: "What kind of employee would you like to add?",
        type: "list",
        name: "newStaff",
        choices: ["Engineer", "Intern", "I'm done adding employees"],
      },
    ])
    .then((answers) => {
      if (answers.newStaff === "Engineer") {
        newEngineer();
      }
      if (answers.newStaff === "Intern") {
        newIntern();
      } 
      else if (answers.newStaff === "I'm done adding employees") {
        //render(employeeArr);
        createFile(render(employeeArr));
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

function newEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Enter an engineer's name",
      },
      {
        type: "input",
        name: "engineerID",
        message: "Enter the engineer's ID",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Enter the engineer's email address",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Enter the engineer's Github username",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerID,
        answers.engineerEmail,
        answers.engineerGithub
      );
      employeeArr.push(engineer);
      newEmployee();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

function newIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "Enter an intern's name",
      },
      {
        type: "input",
        name: "internID",
        message: "Enter the intern's ID",
      },
      {
        type: "input",
        name: "internEmail",
        message: "Enter the intern's email address",
      },
      {
        type: "input",
        name: "internSchool",
        message: "Where does the intern go to school?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.internName,
        answers.internID,
        answers.internEmail,
        answers.internSchool
      );
      employeeArr.push(intern);
      newEmployee();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

function createFile(data) {
    return fs.writeFile(outputPath, data, err => {
        if (err){
            console.log(err)
            return
        }
        console.log("File created successfully!")
    })
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
