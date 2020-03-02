use employees_db;

INSERT INTO department (name)
VALUES ("Rolling Stones"), ("Queen");

INSERT INTO role (title, salary, department_id)
VALUES ("lead vocals", 420.000, 1), ("guitar and vocals", 420.00, 2), ("guitar", 420.000, 1), ("bass", 450.000, 1), ("drums", 450.000, 1), ("lead vocals and piano", 500.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Jagger", 1, 101), ("Brian", "Jones", 3, 101), 
("Keith", "Richards", 4, 101), ("Bill", "Wyman", 5, 101), 
("Freddie", "Mercury", 6, 102), ("Brian", "May", 2, 102);


select * from employee;
select * from department;
select * from role;