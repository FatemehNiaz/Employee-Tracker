# 12 SQL: Employee Tracker

## Task

To allow non-developers to be able to view and interact with information and data stored in databases, Developers have to create interfaces using interfaces like CMS (content management systems). You need to build a command-line application using Node.js, Inquirer, and MySQL to manage a company's employee database.


## User Story

```md
AS A business owner
I WANT you to build an application which enables me to view and manage the departments, roles, and employees in my company
SO THAT I would be able to organize and plan my business
```

## Description

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I will be taken to these options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I can view a formatted table  which shows me the department names and department ids
WHEN I choose to view all roles
THEN I am presented with the  following: job title, role id, the department that role belongs to, and the salary for that role
WHEN I select to view all employees
THEN I am presented with a formatted table which shows following items: employee data, including employee ids, the first names, last names, the job titles, departments, salaries, and the employee's managers that the employees report to
WHEN I select to add a department
THEN I am asked to enter the name of the department, and that department will be added to the database
WHEN I select to add a role
THEN I am asked to enter the the following  items: name of that role, salary, and department for the role and that role is added to the database
WHEN I selasked to enter the following information regarding the employee: first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am asked to choose an employee to update with their new role and this new information will be updated in the database 
```

## Mock-Up & Walkthrough Video

The following video is a walk through video of how this Employee Tracker work:

[![This is the link to my walk through video.](https://youtu.be/2a1XuN7wyO8)

[![This is the link to image after I did finish all the steps in the Terminal.](./Assets/Employess-Tracker%20.png)





### Techniques 



 * Using the Inquirer package

 * Using the MySQL2 package

 * Using the console.table package


### License

MIT License, Copyright (c) 2022
