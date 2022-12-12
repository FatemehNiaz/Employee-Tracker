USE employee_tracker;

INSERT INTO department(name) VALUES('IT');
INSERT INTO department(name) VALUES('Interior Design');
INSERT INTO department(name) VALUES('HR');

INSERT INTO roles(title,salary,department_id) VALUES('Developer',150000,1);
INSERT INTO roles(title,salary,department_id) VALUES('Designer',100000,2);
INSERT INTO roles(title,salary,department_id) VALUES('HR Manager',120000,3);
INSERT INTO roles(title,salary,department_id) VALUES('Graphic Designer',200000,1);



INSERT INTO employee(first_name,last_name,role_id) VALUES('John','Robinson',2);
INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES('Leila','Smith',4,1);
INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES('Mary','Johnson',4,2);