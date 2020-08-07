const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Database = require("./js/dbclass");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Singles@220bpm",
    database: "Employee_DB"
  });

connection.connect(function() {
    runInquirer();
}); 

async function runInquirer(){
    const questions = [
       { type: 'list',
         name: 'choice',
         message: 'What would you like to do?',
         choices:['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Roles']
       }
    ]
    const response = await inquirer.prompt(questions);
     if (response.choice === 'Add Department'){
        addDepartment(); 
    }else if(response.choice === 'Add Role'){
        addRole();
    }else if(response.choice === 'Add Employee'){
        addEmployee();
    }else if(response.choice === 'View Departments'){
        viewDepartments();
    }else if(response.choice === 'View Roles'){
        viewRoles();
    }else if(response.choice === 'View Employees'){
        viewEmployees();
    }else if(response.choice === 'Update Employee Roles'){
        updateEmployeeRole();
    }
}

async function addDepartment() {
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the department name'
        }
    ]
    const response = await inquirer.prompt(questions);
    connection.query('INSERT INTO departments (name) Values (?)',[response.name], function(err) {
        if (err) {
            console.log('Error found:', err);
        }else {
            runInquirer()
        }
    });
};

async function addRole() {
    
    
    currentDepartmentsArray = [];

    await connection.query("SELECT * FROM departments", function(err, res){
        if (err) {
            throw err;
        }else {
            setValue(res);
        }
        // Object(res)
        //     console.log("Object is: ", Object(res));
        //     currentDepartmentsArray.push(res);
        //     console.log("currentDepartmentsArray is : ", currentDepartmentsArray);
       });
    
    function setValue(value) {
        currentDepartmentsArray = value;
        console.log("Current Departments Array is: ", currentDepartmentsArray);
    }

    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'Enter the Role Title',
        },

        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary for this role'
        },

        {
            type: 'list',
            name: 'department_id',
            message:"Select a Department",
            choices: currentDepartmentsArray.map()
                
           
        },
    ]
    

    const response = await inquirer.prompt(questions);
    connection.query("INSERT INTO role SET ?",
        {
          title: response.title,
          salary: response.salary || 0,
          department_id: response.department_id,
        },
        
        function(err) {
          if (err) throw err;
        });
        runInquirer()
};

async function addEmployee() {
    const questions = [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is your first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is your last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter your Role ID?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter your Manager ID?'
        },
    ]

    const response = await inquirer.prompt(questions);
    connection.query("INSERT INTO employee SET ?",
        {
          first_name: response.first_name,
          last_name: response.last_name,
          role_id: response.role_id,
          manager_id: response.manager_id 
        },

        function(err) {
          if (err) throw err;
        });
        runInquirer()
    
};

function viewDepartments() {
    console.log("Fetching all departments...\n");
    connection.query("SELECT name FROM departments", function(err, res) {
        if (err) throw err;
        
        console.table("Here is a list of all current Departments: ", res);
        setTimeout(function(){
            runInquirer(); 
        }, 1000);
        
    });
    
    // runInquirer();
};

async function viewRoles() {
    console.log("Fetching all roles...\n");
    connection.query("SELECT title, salary, department_id FROM `role`", function(err, res) {
        if (err) throw err;
       
        console.table("Here is a list of all current Roles: ", res);
        setTimeout(function(){
            runInquirer(); 
        }, 1000);
        
    });
};

async function viewEmployees() {
    console.log("Fetching all employees...\n");
    connection.query("SELECT first_name, last_name, role_id FROM employee", function(err, res) {
        if (err) throw err;
        
        console.table("Here is a list of all current Employees: ", res);
        setTimeout(function(){
            runInquirer(); 
        }, 1000);
        
    });
};

async function updateEmployeeRole() {

};