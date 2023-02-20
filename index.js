const mysql = require('mysql2')
const inquirer = require('inquirer'); //npm install --save inquirer@^8.0.0
const cTable = require('console.table'); 
const db = require('./db/connection.js');

// create the database connection
db.connect((err) => {
	
	if (err) {
		throw err;
	}
	
	console.log("Successful database connection");
	
	// display the initial prompt
	mainMenu();
	
});



// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const mainMenu = () => {
	
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			name: "choice",
			choices: [
				"view all departments",
				"view all roles",
				"view all employees",
				"add a department",
				"add a role",
				"add an employee",
				"update an employee role"
			]
		}
	]).then((userInput) => {
		
		
		if (userInput.choice == "view all departments") {
			viewAllDepartments();
		} else if (userInput.choice == "view all roles") {
			viewAllRoles();
		} else if (userInput.choice == "view all employees") {
			viewAllEmployees();
		} else if (userInput.choice == "add a department") {
			addDepartment();
		} else if (userInput.choice == "add a role") {
			addRole();
		} else if (userInput.choice == "add an employee") {
			addEmployee();
		} else if (userInput.choice == "update an employee role") {
			updateEmployeeRole();
		}
		
	});
	
};

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const viewAllDepartments = () => {
	
	let sql = "";
	sql += "SELECT id, name ";
	sql += "FROM department ";
	sql += "ORDER BY name;";
	
	// execute the select query
	db.query(sql, (err, res) => {
		
		// check if there was an error
		if (err) {
			throw err;
		}
		
		// display the results
		console.table(res);
		
		// display the main menu
		mainMenu();
		
	});
	
};


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewAllRoles = () => {
	
	let sql = ""
	sql += "SELECT r.title, r.id, d.name AS department, r.salary ";
	sql += "FROM roles r ";
	sql += "JOIN department d ON d.id = r.department_id ";
	sql += "ORDER BY r.title;"
	
	// execute the select query
	db.query(sql, (err, res) => {
		
		// check if there was an error
		if (err) {
			throw err;
		}
		
		// display the results
		console.table(res);
		
		// display the main menu
		mainMenu();
		
	});
	
}


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewAllEmployees = () => {
	
	let sql = "";
	sql += "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, ";
	sql += "CONCAT(m.first_name, ' ', m.last_name) AS manager ";
	sql += "FROM employee e ";
	sql += "JOIN roles r ON r.id = e.role_id ";
	sql += "JOIN department d ON d.id = r.department_id ";
	sql += "LEFT JOIN employee m ON m.id = e.manager_id ";
	sql += "ORDER BY e.first_name, e.last_name;";
	
	// execute the select query
	db.query(sql, (err, res) => {
		
		// check if there was an error
		if (err) {
			throw err;
		}
		
		// display the results
		console.table(res);
		
		// display the main menu
		mainMenu();
		
	});
	
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const addDepartment = () => {
	
	inquirer.prompt([
		{
			type: "input",
			message: "What is the name of the department?",
			name: "departmentName"
		}
	]).then((userInput) => {
		
		let sql = "";
		sql += "INSERT INTO department (name) VALUES (?);";
		
		// replace the ? with actual values
		let values = [userInput.departmentName];
		
		// execute the insert query
		db.query(sql, values, (err) => {
			
			// check if there was an error
			if (err) {
				throw err;
			}
			
			// display the results
			console.log("Added " + userInput.departmentName + " to the database");
			
			// display the main menu
			mainMenu();
			
		});
		
	});
	
}


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = () => {
	
	// get the departments
	sql = "";
	sql += "SELECT id, name ";
	sql += "FROM department ";
	sql += "ORDER BY name;";
	
	// execute the select query
	db.query(sql, (err, res) => {
		
		// create a list of departments for the prompt's choices
		let departmentChoices = res.map(({id, name}) => ({
			value: id,
			name: name
		}));
		
		inquirer.prompt([
			{
				type: "input",
				message: "What is the name of the role?",
				name: "title"
			},
			{
				type: "input",
				message: "What is the salary of the role?",
				name: "salary"
			},
			{
				type: "list",
				message: "Which department does the role belong to?",
				name: "departmentId",
				choices: departmentChoices
			}
		]).then((userInput) => {
			
			let sql = "";
			sql += "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);";
			
			// replace the ? with actual values
			let values = [userInput.title, userInput.salary, userInput.departmentId];
			
			// execute the insert query
			db.query(sql, values, (err) => {
				
				// check if there was an error
				if (err) {
					throw err;
				}
				
				// display the results
				console.log("Added " + userInput.title + " to the database");
				
				// display the main menu
				mainMenu();
				
			});
			
		});
		
	});
		
}


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = () => {
	
	// get the roles
	sql = "";
	sql += "SELECT id, title ";
	sql += "FROM roles ";
	sql += "ORDER BY title;";
	
	// execute the select query
	db.query(sql, (err, res) => {
		
		// create a list of roles for the prompt's role choices
		let roleChoices = res.map(({id, title}) => ({
			value: id,
			name: title
		}));
		
		// get the list of employees
		sql = "";
		sql += "SELECT NULL AS id, 'None' AS name "
		sql += "UNION ";
		sql += "SELECT * FROM (";
		sql += "SELECT id, CONCAT(first_name, ' ', last_name) AS name ";
		sql += "FROM employee ";
		sql += "ORDER BY name) e";
		
		// execute the select query
		db.query(sql, (err, res) => {
			
			// create a list of employees for the prompt's manager choices
			let managerChoices = res.map(({id, name}) => ({
				value: id,
				name: name
			}));
			
			inquirer.prompt([
				{
					type: "input",
					message: "What is the employee's first name?",
					name: "firstName"
				},
				{
					type: "input",
					message: "What is the employee's last name?",
					name: "lastName"
				},
				{
					type: "list",
					message: "What is the employee's role?",
					name: "roleId",
					choices: roleChoices
				},
				{
					type: "list",
					message: "Who is the employee's manager?",
					name: "managerId",
					choices: managerChoices
				}
			]).then((userInput) => {
				
				let sql = "";
				sql += "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
				
				// replace the ? with actual values
				let values = [userInput.firstName, userInput.lastName, userInput.roleId, userInput.managerId];
				
				// execute the insert query
				db.query(sql, values, (err) => {
					
					// check if there was an error
					if (err) {
						throw err;
					}
					
					// display the results
					console.log("Added " + userInput.firstName + " " + userInput.lastName + " to the database");
					
					// display the main menu
					mainMenu();
					
				});
				
			});
			
		});
		
	});
	
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
const updateEmployeeRole = () => {
	
	// get the list of employees
	sql = "";
	sql += "SELECT id, CONCAT(first_name, ' ', last_name) AS name ";
	sql += "FROM employee ";
	sql += "ORDER BY name;";
	
	// execute the select query
	db.query(sql, (err, res) => {
		
		// create a list of employees for the prompt's employee choices
		let employeeChoices = res.map(({id, name}) => ({
			value: id,
			name: name
		}));
		
		// get the list of roles
		sql = "";
		sql += "SELECT id, title ";
		sql += "FROM roles ";
		sql += "ORDER BY title;";
		
		// execute the select query
		db.query(sql, (err, res) => {
		
			// create a list of roles for the prompt's role choices
			let roleChoices = res.map(({id, title}) => ({
				value: id,
				name: title
			}));
			
			inquirer.prompt([
				{
					type: "list",
					message: "Which employee's role do you want to update",
					name: "employeeId",
					choices: employeeChoices
				},
				{
					type: "list",
					message: "Which role do you want to assign the selected employee?",
					name: "roleId",
					choices: roleChoices
				},
			]).then((userInput) => {
				
				let sql = "";
				sql += "UPDATE employee SET role_id = ? WHERE id = ?;";
				
				// replace the ? with actual values
				let values = [userInput.roleId, userInput.employeeId];
				
				// execute the update query
				db.query(sql, values, (err) => {
					
					// check if there was an error
					if (err) {
						throw err;
					}
					
					// display the results
					console.log("Updated employee's role");
					
					// display the main menu
					mainMenu();
					
				});
				
			});
			
		});
		
	});
	
}

