const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Database = require("./js/dbclass");
const table = require("console.table");

const config = {
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Singles@220bpm",
  database: "Employee_DB",
};

const db = new Database(config);

runInquirer();

// var connection = mysql.createConnection({
//     host: "localhost",

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: "root",

//     // Your password
//     password: "Singles@220bpm",
//     database: "Employee_DB"
//   });

// connection.connect(function() {
//     runInquirer();
// });

async function runInquirer() {
  const questions = [
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Roles",
      ],
    },
  ];
  const response = await inquirer.prompt(questions);
  if (response.choice === "Add Department") {
    addDepartment();
  } else if (response.choice === "Add Role") {
    addRole();
  } else if (response.choice === "Add Employee") {
    addEmployee();
  } else if (response.choice === "View Departments") {
    viewDepartments();
  } else if (response.choice === "View Roles") {
    viewRoles();
  } else if (response.choice === "View Employees") {
    viewEmployees();
  } else if (response.choice === "Update Employee Roles") {
    updateEmployeeRole();
  }
  // db.close();
}

async function addDepartment() {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter the department name",
    },
  ];
  const response = await inquirer.prompt(questions);
  await db.query("INSERT INTO departments (name) Values (?)", [response.name]);
  runInquirer();
 
}

async function addRole() {
  const res = await db.query("SELECT * FROM departments");
  const departmentChoices = res.map(({ id, name }) => ({
    value: id,
    name: `${name}`,
  }));
  
  const questions = [
    {
      type: "input",
      name: "title",
      message: "Enter the Role Title",
    },

    {
      type: "input",
      name: "salary",
      message: "Enter salary for this role",
    },

    {
      type: "list",
      name: "department_id",
      message: "Select a Department",
      choices: departmentChoices,
    },
  ];
  const response = await inquirer.prompt(questions);

  await db.query("INSERT INTO role SET ?", {
    title: response.title,
    salary: response.salary || 0,
    department_id: response.department_id,
  });
  runInquirer();
}



async function addEmployee() {
const res = await db.query("SELECT * FROM `role`");
const roleChoices = res.map(({ id, title }) => ({
  value: id,
  name: `${title}`,
}));


  const questions = [
    {
      type: "input",
      name: "first_name",
      message: "What is your first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is your last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "Enter your Role ID?",
      choices: roleChoices,
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter your Manager ID?",
    },
  ];

  const response = await inquirer.prompt(questions);
  db.query(
    "INSERT INTO employee SET ?",
    {
      first_name: response.first_name,
      last_name: response.last_name,
      role_id: response.role_id,
      manager_id: response.manager_id || 0,
    },

    function (err) {
      if (err) throw err;
    }
  );
  console.log(response.first_name, "has been added \n --------------------------------------");
  runInquirer();
}

function viewDepartments() {
  console.log("Fetching all departments...\n");
  db.query("SELECT name FROM departments", function (err, res) {
    if (err) throw err;

    console.table("Here is a list of all current Departments: ", res);
    setTimeout(function () {
      runInquirer();
    }, 2000);
  });

  // runInquirer();
}

async function viewRoles() {
  console.log("Fetching all roles...\n");
  db.query("SELECT title, salary, department_id FROM `role`", function (
    err,
    res
  ) {
    if (err) throw err;

    console.table("Here is a list of all current Roles: ", res);
    setTimeout(function () {
      runInquirer();
    }, 2000);
  });
}

async function viewEmployees() {
  console.log("Fetching all employees...\n");

  // const query = ``;

  await db.query("SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN `role` ON employee.role_id=role.id", function (err, res) {
    if (err) throw err;
    console.log("query result is: ", res);
    console.table("Here is a list of all current Employees: ", res);
    setTimeout(function () {
      runInquirer();
    }, 2000);
  });
}

async function updateEmployeeRole() {
  const empRes = await db.query("SELECT * FROM employee");

  const employeeChoices = empRes.map(({ id, first_name }) => ({
    value: id,
    name: `${first_name}`,
    
  }));

  // console.log(employeeChoices);

  const roleRes = await db.query("SELECT * FROM `role`");

  const roleChoices = roleRes.map(({ id, title }) => ({
    value: id,
    name: `${title}`,
  }));

  // console.log(roleChoices);

  const questions = [
    {
      type: "list",
      name: "employee_id",
      message: "Choose Employee that you would like to modify role: ",
      choices: employeeChoices
    },
    {
      type: "list",
      name: "new_role",
      message: "Select a new role for this employee",
      choices: roleChoices,
    }
  ];
  
  const response = await inquirer.prompt(questions);
  

  await db.query("UPDATE employee SET role_id = (?) WHERE id = (?);", 
      [
        response.new_role,
        response.employee_id
      ]
  );
  runInquirer();

}

// workbench statement
"UPDATE employee SET role_id = WHERE  = ;"