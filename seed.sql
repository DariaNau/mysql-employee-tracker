use employees_db;

INSERT INTO department (name)
VALUES ("Rolling Stones"), ("Queen");

INSERT INTO role (title, salary, department_id)
VALUES ("lead vocals", 420.000, 1), ("guitar and vocals", 420.00, 2), ("group manager", 420.000, 1), ("bass", 450.000, 1), ("drums", 450.000, 1), ("lead vocals and piano", 500.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Jagger", 1, 3), ("Brian", "Jones", 3, 3), 
("Keith", "Richards", 4, 3), ("Bill", "Wyman", 5, 3), 
("Freddie", "Mercury", 6, 3), ("Brian", "May", 2, 3);


select * from employee;
select * from department;
select * from role;